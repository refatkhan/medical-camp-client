import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from "@mui/material";
import { toast } from "react-hot-toast";

const RegisteredCamps = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch registered camps
    const { data: camps = [], isLoading } = useQuery({
        queryKey: ["registeredCamps", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/registered-camps?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const handleCancel = async (id, isPaid) => {
        if (isPaid) {
            toast.error("Cannot cancel after payment.");
            return;
        }
        try {
            await axiosSecure.delete(`/registered-camps/${id}`);
            toast.success("Registration canceled successfully");
            queryClient.invalidateQueries(["registeredCamps"]);
        } catch (err) {
            console.error(err);
            toast.error("Failed to cancel registration");
        }
    };

    const handlePay = (camp) => {
        // Redirect to payment page (assume you have a route /payment/:campId)
        window.location.href = `/payment/${camp._id}`;
    };

    const handleFeedback = (camp) => {
        // Open feedback modal or redirect to feedback page
        window.location.href = `/feedback/${camp._id}`;
    };

    if (isLoading) return <div>Loading...</div>;

    return (
        <TableContainer component={Paper} className="p-4">
            <h2 className="text-xl font-semibold mb-4">Registered Camps</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Camp Name</TableCell>
                        <TableCell>Camp Fees</TableCell>
                        <TableCell>Participant Name</TableCell>
                        <TableCell>Payment Status</TableCell>
                        <TableCell>Confirmation Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {camps.map((camp) => (
                        <TableRow key={camp._id}>
                            <TableCell>{camp.campDetails.name}</TableCell>
                            <TableCell>${camp.campDetails.fees}</TableCell>
                            <TableCell>{user.displayName || user.email}</TableCell>
                            <TableCell>
                                {camp.paymentStatus === "paid" ? (
                                    "Paid"
                                ) : (
                                    <Button variant="contained" color="primary" onClick={() => handlePay(camp)}>
                                        Pay
                                    </Button>
                                )}
                            </TableCell>
                            <TableCell>{camp.confirmationStatus || "Pending"}</TableCell>
                            <TableCell>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    onClick={() => handleCancel(camp._id, camp.paymentStatus === "paid")}
                                    disabled={camp.paymentStatus === "paid"}
                                    className="mr-2"
                                >
                                    Cancel
                                </Button>
                                {camp.paymentStatus === "paid" && (
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        size="small"
                                        onClick={() => handleFeedback(camp)}
                                    >
                                        Feedback
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {camps.length === 0 && <p className="mt-4">You have not joined any camps yet.</p>}
        </TableContainer>
    );
};

export default RegisteredCamps;
