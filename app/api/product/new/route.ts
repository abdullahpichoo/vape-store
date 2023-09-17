import { connectToDatabase } from "@/utils/database";
import Prompt from "@/models/product";

// export const POST = async (req) => {
//   const { userId, prompt, tag } = await req.json();

//   try {
//     console.log("Calling Create Prompt...");
//     await connectToDatabase();
//     console.log("DB Connected...");
//     const newPrompt = await Prompt.create({
//       creator: userId,
//       prompt,
//       tag,
//     });
//     console.log("Prompt Created: ", newPrompt);

//     return new Response(JSON.stringify(newPrompt), { status: 201 });
//   } catch (error) {
//     console.log("Create Prompt Error: ", error);
//     return new Response(JSON.stringify(newPrompt), { status: 500 });
//   }
// };
