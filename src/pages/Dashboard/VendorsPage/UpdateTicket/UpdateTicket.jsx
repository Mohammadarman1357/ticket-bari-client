import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useForm, useWatch } from 'react-hook-form';
import Swal from 'sweetalert2';

const UpdateTicket = () => {

    const { ticketId } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    // load data from tickets
    const { refetch, data: tickets = [] } = useQuery({
        queryKey: ['ticket', ticketId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/tickets/single/${ticketId}`);
            console.log(res.data)
            return res.data;
        }
    });

    const { register, handleSubmit, control } = useForm({
        defaultValues: tickets
    });

    // bus counter region 
    const busCounters = useLoaderData();
    const regionsDuplicate = busCounters.map(c => c.region);
    const regions = [...new Set(regionsDuplicate)];

    // explore useMemo useCallback 
    const regionFrom = useWatch({ control, name: "regionFrom" });    // --> kon region e seta watch kora
    const regionTo = useWatch({ control, name: 'regionTo' });

    const districtByRegion = (region) => {
        const regionDistricts = busCounters.find(c => c.region === region);
        return regionDistricts ? regionDistricts.districts : [];
    }


    const handleUpdateTicket = data => {

        console.log(data)

        // cost calculation
        const isTrain = data.transportType === 'train';
        const isNonAC = data.perks === 'nonAC';

        const isSameDistrict = data.districtFrom === data.districtTo;
        const pricePerUnit = parseFloat(data.pricePerUnit);
        const ticketQuantity = parseInt(data.ticketQuantity);

        let cost = 0;
        const chargeDifferentDistrictTrain = 50;
        const chargeDifferentDistrictBus = 100;
        const chargeAC = 100;
        const ticketPrice = pricePerUnit * ticketQuantity;

        if (isTrain) {
            if (isNonAC) {
                const extraCharge = ticketPrice + chargeDifferentDistrictTrain;
                cost = isSameDistrict ? ticketPrice : extraCharge;
            }
            else {
                const sameDistrictCharge = ticketPrice + chargeAC;
                const extraCharge = ticketPrice + chargeDifferentDistrictTrain + chargeAC;
                cost = isSameDistrict ? sameDistrictCharge : extraCharge;
            }
        }
        else {  // bus
            if (isNonAC) {
                const extraCharge = ticketPrice + chargeDifferentDistrictBus;
                cost = isSameDistrict ? ticketPrice : extraCharge;
            }
            else {
                const sameDistrictCharge = ticketPrice + chargeAC;
                const extraCharge = ticketPrice + chargeDifferentDistrictBus + chargeAC;
                cost = isSameDistrict ? sameDistrictCharge : extraCharge;
            }
        }
        console.log('cost', cost);
        data.cost = cost;

        const updatedInfo = {
            transportType: data.transportType,
            ticketTitle: data.ticketTitle,
            regionFrom: data.regionFrom,
            districtFrom: data.districtFrom,
            regionTo: data.regionTo,
            districtTo: data.districtTo,
            perks: data.perks,
            quantity: ticketQuantity,
            pricePerUnit: pricePerUnit,
            totalCost: data.cost,
            departureTime: data.departureTime,
            status: 'pending'
        }

        Swal.fire({
            title: "Are you sure ?",
            text: `Ticket will be Updated.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm and Continue!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/tickets/${ticketId}`, updatedInfo)
                    .then(res => {
                        if (res.data.modifiedCount) {
                            navigate('/dashboard/my-added-tickets');
                            // refresh data
                            refetch();
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: `Ticket has been updated successfully!`,
                                showConfirmButton: false,
                                timer: 2000
                            })
                        }
                    })
            }
        })

    }

    return (
        <div className='p-5 md:p-10 space-y-5 bg-white rounded-3xl m-2 md:m-6'>
            <h2 className='text-4xl font-black text-secondary'>Update Ticket : {tickets.ticketTitle}</h2>

            <form onSubmit={handleSubmit(handleUpdateTicket)}
                className='space-y-5 p-4 text-black'>

                <h2 className='text-2xl font-bold'>Enter your Ticket details</h2>
                <hr className='text-gray-300' />

                {/* ticket type */}
                <div>
                    <label className='label  font-bold mr-6  text-black'>
                        <input type="radio" {...register('transportType')}
                            value="bus" className="radio radio-primary" defaultChecked />
                        Bus
                    </label>
                    <label className='label font-bold text-black'>
                        <input type="radio" {...register('transportType')}
                            value="train" className="radio radio-primary" />
                        Train
                    </label>
                </div>
                <hr className='text-gray-300' />


                {/* two column */}
                <h4 className="text-xl font-semibold mb-4">Ticket Details</h4>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-12 my-8'>
                    {/* ticket details */}


                    {/* left side */}
                    <div>
                        <fieldset className="fieldset">
                            {/* ticket title */}
                            <label className="label font-bold text-black">Ticket Title</label>
                            <input type="text" {...register('ticketTitle')} defaultValue={tickets?.ticketTitle} className="input w-full" placeholder="Ticket Title" />
                            {/* From Region */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Select Regions</legend>
                                <select {...register('regionFrom')} defaultValue="Pick a region" className="select w-full">
                                    <option disabled={true}>Pick a region</option>
                                    {
                                        regions.map((r, i) =>
                                            <option key={i} value={r}>{r}</option>
                                        )
                                    }
                                </select>
                            </fieldset>

                            {/* From District */}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">From</legend>
                                <select {...register('districtFrom')} defaultValue="Select Your District" className="select w-full">
                                    <option disabled={true}>Select Your District</option>
                                    {
                                        districtByRegion(regionFrom).map((r, i) =>    // region onojayi district dekabe
                                            <option key={i} value={r}>{r}</option>
                                        )
                                    }
                                </select>
                            </fieldset>
                            {/* Perks */}

                            <label className="label font-bold text-black mt-2">Perks</label>
                            <div>
                                <label className='label  font-bold mr-6  text-black'>
                                    <input type="radio" {...register('perks')}
                                        value="nonAC" className="radio radio-primary" defaultChecked />
                                    Non AC
                                </label>
                                <label className='label font-bold text-black'>
                                    <input type="radio" {...register('perks')}
                                        value="ac" className="radio radio-primary" />
                                    AC
                                </label>
                            </div>

                            {/* Ticket quantity */}
                            <label className="label font-bold text-black">Ticket Qunatity</label>
                            <input type="number" {...register('ticketQuantity')} defaultValue={tickets?.ticketQuantity} className="input w-full" placeholder="Ticket Quantity" />



                        </fieldset>
                    </div>

                    {/* right side */}
                    <div>
                        <fieldset className="fieldset">
                            {/* ticket price */}
                            <label className="label font-bold text-black">Price (Per unit)</label>
                            <input type="number" {...register('pricePerUnit')} defaultValue={tickets?.pricePerUnit} className="input w-full" placeholder="Price (per unit)" />

                            {/* Region To*/}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Select Regions</legend>
                                <select {...register('regionTo')} defaultValue="Pick a region" className="select w-full">
                                    <option disabled={true}>Pick a region</option>
                                    {
                                        regions.map((r, i) =>
                                            <option key={i} value={r}>{r}</option>
                                        )
                                    }
                                </select>
                            </fieldset>

                            {/* District To*/}
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">To</legend>
                                <select {...register('districtTo')} defaultValue="Select Your District" className="select w-full">
                                    <option disabled={true}>Select Your District</option>
                                    {
                                        districtByRegion(regionTo).map((d, i) =>  // show region wise districts
                                            <option key={i} value={d}>{d}</option>
                                        )
                                    }
                                </select>
                            </fieldset>

                            {/* Departure Time */}
                            <label className="label font-bold text-black">Departure Time</label>
                            <input type="datetime-local" {...register('departureTime')} defaultValue={tickets?.departureTime} className="input w-full" placeholder="Departure Time" />


                        </fieldset>
                    </div>
                </div>
                <input type="submit" className='btn btn-primary text-secondary' value="Update Ticket" />
            </form>

        </div>
    );
};

export default UpdateTicket;