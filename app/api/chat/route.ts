import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { messages, systemPrompt } = await request.json();

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemPrompt || "당신은 유능한 AI 어시스턴트입니다. 한국어로 답변해주세요.",
      messages: messages,
    });

    return NextResponse.json({
      content: response.content[0].type === "text" ? response.content[0].text : "",
    });
  } catch (error) {
    console.error("Anthropic API 오류:", error);
    return NextResponse.json(
      { error: "AI 응답 생성 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}