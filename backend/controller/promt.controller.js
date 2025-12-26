import OpenAI from "openai";
import { Promt } from "../model/promt.model.js";
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey:"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",
});
console.log(openai.apiKey);

// sendpromt - /api/v1/deepseekai/promt
export const sendPromt =async(req,res)=>{
  const content = req.body?.content;
  const userId = req.userId;

   if(!content || content.trim()===""){
    return res.status(400).json({error:"pormt content is require"})
   }
   try {

    //save user promt
    const userPromt = await Promt.create({
      userId,
      role: "user",
      content,
    });

    //send to OpenAI
    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-4o',
      messages: [
        {
          role: 'user',
          content:content  ,
        },
      ],
      max_tokens: 500   
    });
    const aiContent =completion.choices[0].message.content 

    //save assistant promt
    const aiMessage = await Promt.create({
      userId,
      role: "assistant",
      content: aiContent,
    });
    return res.status(200).json({replay:aiContent})

   } catch (error) {
    console.log("error in prompt",error);
    return res.status(500).json({error:"Error in promt"}) 
   }
}