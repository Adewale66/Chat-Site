import PusherClient from "pusher-js";
import PusherServer from "pusher";

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
  {
    cluster: "eu",
    channelAuthorization: {
      endpoint: "/api/pusher/auth",
      transport: "ajax",
    },
  }
);

export const pusherServer = new PusherServer({
  cluster: "eu",
  appId: process.env.PUSHER_APP_ID as string,
  secret: process.env.PUSHER_APP_SECRET as string,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string,
});
