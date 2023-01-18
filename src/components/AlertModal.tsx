"use client";

import { useAtom } from "jotai";
import { SubmitHandler, useForm } from "react-hook-form";
import { RxCheck } from "react-icons/rx";

import { showAlertModalAtom } from "@/atoms/alertModal";
import Modal from "@/components/Modal";
import { z } from "zod";
import { useState } from "react";
import { Button } from "./Button";

type FormData = { email: string };

export const AlertModal = () => {
  const [showAlertModal, setShowAlertModal] = useAtom(showAlertModalAtom);
  const [state, setState] = useState<{
    status?: "loading" | "error" | "success";
    message?: string;
  }>({});
  const { register, handleSubmit, formState } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    setState({ status: "loading" });
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const resShape = z.object({
      error: z
        .object({ message: z.string(), stack: z.any().optional() })
        .optional(),
    });
    const data = resShape.parse(await res.json());
    if (data.error) {
      setState({ status: "error", message: data.error?.message });
    } else {
      setState({ status: "success" });
    }
  };

  return (
    <Modal
      show={showAlertModal}
      onClickOutside={() => setShowAlertModal(false)}
    >
      <Modal.CloseButton onClick={() => setShowAlertModal(false)} />
      <Modal.Content>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-neutral-900"
            >
              Email
            </label>
            <input
              {...register("email")}
              id="email"
              type="email"
              placeholder="name@domain.com"
              className="block w-full rounded-lg border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-300"
            />
            {state.status === "error" && (
              <p className="mt-2 text-sm text-red-600">{state.message}</p>
            )}
            <Button
              full
              className="mt-2"
              type="submit"
              disabled={
                state.status === "loading" || state.status === "success"
              }
              variant={state.status === "success" ? "success" : "default"}
              Icon={state.status === "success" ? RxCheck : undefined}
            >
              Get notified
            </Button>
          </div>
        </form>
      </Modal.Content>
    </Modal>
  );
};
