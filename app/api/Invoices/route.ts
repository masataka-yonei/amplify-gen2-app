import { NextRequest, NextResponse } from 'next/server';
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

// Amplify の設定を読み込んで初期化
Amplify.configure(outputs);

// データ用のクライアントを生成
const client = generateClient<Schema>();

// GETリクエスト: GraphQLのobserveQueryを使い、全てのInvoicesレコードを取得
export async function GET() {
  return new Promise<Response>((resolve, reject) => {
    const subscription = client.models.Invoices.observeQuery({ })
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

// POST リクエストハンドラ: GraphQLのcreate操作を使って、請求書（Invoice）データを登録
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const invoiceData = {
      InvoiceID: body.InvoiceID,
      BillNo: body.BillNo,
      SlipNo: body.SlipNo,
      CustomerID: body.CustomerID,
      CustomerName: body.CustomerName,
      Products: body.Products,
      Number: body.Number,
      UnitPrice: body.UnitPrice,
      Date: body.Date,
    };    
    const result = await client.models.Invoices.create(invoiceData);
    return NextResponse.json({ result });
  } catch (error: any) {
    console.error("Error creating Invoice:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}