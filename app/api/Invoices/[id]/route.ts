import { NextResponse, NextRequest } from 'next/server';
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

// Amplify の設定を読み込んで初期化
Amplify.configure(outputs);

// データ用のクライアントを生成
const client = generateClient<Schema>();

// GET: 指定された Invoice ID に一致するレコードを取得
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  return new Promise<Response>((resolve, reject) => {
    const subscription = client.models.Invoices.observeQuery({ filter: { InvoiceID: { eq: id } } })
      .subscribe({
        next: (snapshot: any) => {
          subscription.unsubscribe(); 
          resolve(NextResponse.json(snapshot.items));
        },
        error: (error: any) => {
          reject(NextResponse.json({ error: error.message }, { status: 500 }));
        }
      });
  });
}

// PUT: 指定された Invoice ID のレコードを更新（update を使用）
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    const body = await request.json();
    const result = await client.models.Invoices.update({ InvoiceID: id, ...body });
    return NextResponse.json({ result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: 指定された Invoice ID のレコードを削除（delete を使用）
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const id = (await params).id;
    const result = await client.models.Invoices.delete({ InvoiceID: id });
    return NextResponse.json({ result });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
