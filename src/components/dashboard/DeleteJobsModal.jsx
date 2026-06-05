"use client";

import React from "react";
import { Button, Modal } from "@heroui/react";
import { FiTrash2, FiAlertTriangle, FiX } from "react-icons/fi";
import { DeleteJob } from "@/lib/actions/jobs";

export function DeleteJobsModal({ jobId, jobTitle }) {

    const handleDeleteAction = async () => {
        try {
            const success = await DeleteJob(jobId);

            if (success) {
                console.log(`Successfully completed wipe sequence for entry ID: ${jobId}`);


            }
        } catch (error) {
            console.error("Failed to eliminate listing instance:", error);
        }
    };

    return (
        <Modal>
            {/* Icon Trigger Target Row Integration Component */}
            <Button
                className="p-1.5 min-w-0 h-auto rounded-sm bg-zinc-900/50 border border-zinc-800 text-zinc-500 hover:text-rose-400 hover:border-rose-900/50 transition-colors"
                variant="light"
            >
                <FiTrash2 className="w-3.5 h-3.5" />
            </Button>

            <Modal.Backdrop className="backdrop-blur-sm bg-black/60">
                <Modal.Container>
                    <Modal.Dialog className="sm:max-w-[400px] bg-[#0c0b10] border border-zinc-800 text-zinc-100 rounded-xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]">
                        <Modal.CloseTrigger className="text-zinc-500 hover:text-white transition-colors right-4 top-4" />

                        <Modal.Header className="flex gap-4 pt-6 px-6 pb-2 items-start">
                            {/* Alert Danger Circle Graphic Block */}
                            <div className="w-10 h-10 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                                <FiAlertTriangle className="w-5 h-5 text-rose-400" />
                            </div>
                            <div className="space-y-1">
                                <Modal.Heading className="text-md font-bold text-white tracking-wide">
                                    Remove Position Record
                                </Modal.Heading>
                                <p className="text-xs text-zinc-500">This operations process architecture is irreversible.</p>
                            </div>
                        </Modal.Header>

                        <Modal.Body className="px-6 py-3">
                            <div className="bg-zinc-950/40 border border-zinc-900 p-3 rounded-lg">
                                <p className="text-xs text-zinc-400 leading-relaxed">
                                    Are you absolutely certain you want to purge the posting for <span className="text-rose-400 font-semibold font-mono">{jobTitle || 'Unspecified Position'}</span>? This will wipe out all corresponding matrix telemetry records permanently.
                                </p>
                            </div>
                        </Modal.Body>

                        {/* Split Button Grid Layout System */}
                        <Modal.Footer className="flex items-center gap-3 p-6 bg-zinc-900/20 border-t border-zinc-900/60 mt-4">
                            <Button
                                className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 rounded-lg text-xs font-bold py-2.5 transition-colors"
                                slot="close"
                            >
                                <FiX className="w-3.5 h-3.5 mr-1" />
                                Cancel
                            </Button>

                            <Button
                                className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg text-xs py-2.5 transition-all duration-150 shadow-[0_4px_12px_rgba(225,29,72,0.2)]"
                                onClick={handleDeleteAction}
                                slot="close" // Closes modal automatically upon confirmation click event loop trigger
                            >
                                <FiTrash2 className="w-3.5 h-3.5 mr-1" />
                                Delete Listing
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}