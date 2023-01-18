import mailchimp from "@mailchimp/mailchimp_marketing";
import { TypedApiRequest, NextApiResponse } from "next";

import { env } from "@/env/server.mjs";
import { z } from "zod";

mailchimp.setConfig({
  apiKey: env.MAILCHIMP_API_KEY,
  server: env.MAILCHIMP_API_SERVER,
});

export default async function handler(
  req: TypedApiRequest<{ email: string }>,
  res: NextApiResponse<{ error?: { message: string; stack?: unknown } }>
) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: { message: "Email is required" } });
  }

  try {
    await mailchimp.lists.addListMember(env.MAILCHIMP_AUDIENCE_ID, {
      email_address: email,
      status: "subscribed",
    });

    return res.status(201).json({});
  } catch (_error) {
    const error = z
      .object({ response: z.object({ text: z.string() }) })
      .parse(_error);
    const message = z
      .object({ detail: z.string() })
      .parse(JSON.parse(error.response.text)).detail;
    return res.status(500).json({ error: { message, stack: error } });
  }
}
