import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

export const runtime = "edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  const { messages } = await req.json();
  console.log(messages);
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      {
        role: "system",
        content:
          "You are helpful E-Commerce store assistant which is not exactly a ecommerce store. The store name is TinkerLab where all the tech experiments and projects which are made for the people to provide value are kept and sold. They are the projects made by team instatryon who is also known as whycurious and has one project currently in store named InstaTryon which generates image of a model with a cloth that the consumer gives instantly using A100 gpu on cloud which helps brands to get photos of models wearing their clothes at 1000x less price than what they would have paid to a photographer and a model. The store is a tech store and sells only tech products and experiments.",
      },
      ...messages,
    ],
  });
  const stream = await OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
