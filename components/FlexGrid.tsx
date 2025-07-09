'use client';

/**
 * FlexGrid.tsx
 * Wijmo FlexGridを使用した請求書管理用グリッド。
 */
import React from "react";
import "@mescius/wijmo.styles/wijmo.css";
import * as WjCore from "@mescius/wijmo";
import * as WjGrid from "@mescius/wijmo.react.grid";
import { FlexGridFilter } from "@mescius/wijmo.react.grid.filter";
import "@mescius/wijmo.cultures/wijmo.culture.ja";
import { CollectionViewNavigator } from "@mescius/wijmo.react.input";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";

// Amplify の設定を読み込んで初期化
Amplify.configure(outputs);

import useLicense from '../hooks/useLicense';

const client = generateClient<Schema>();

/**
 * 請求書レコードの型定義。
 */
export type InvoiceRecord = {
  InvoiceID: string;
  BillNo: string;
  SlipNo: string;
  CustomerID: string;
  CustomerName: string;
  Products: string;
  Number: number;
  UnitPrice: number;
  Date: string;
};

//export type InvoiceRecord 

type InvoicesQuery = {
  items: InvoiceRecord[];
  isSynced: boolean;
};

/**
 * 必須フィールドが全て存在するか検証する
 */
const isValidInvoice = (item: Partial<InvoiceRecord>): item is InvoiceRecord => {
  return !!(
    item.InvoiceID &&
    item.BillNo &&
    item.SlipNo &&
    item.CustomerID &&
    item.CustomerName &&
    item.Products &&
    typeof item.Number === 'number' &&
    typeof item.UnitPrice === 'number' &&
    item.Date
  );
};

function FlexGrid() {
  const isLicenseLoaded = useLicense(WjCore, 'wijmo');
  const [invoices, setInvoices] = React.useState<WjCore.CollectionView<InvoiceRecord>>(
    new WjCore.CollectionView<InvoiceRecord>([], {
      trackChanges: true,
      pageSize: 15,
    })
  );

  React.useEffect(() => {
    if (!isLicenseLoaded) return;
    
    client.models.Invoices.observeQuery().subscribe({
      next: ({ items, isSynced }) => {
        setInvoices(
          new WjCore.CollectionView<InvoiceRecord>(items, {
            trackChanges: true,
            pageSize: 15,
          })
        );
      },
      error: (err) => console.error("invoicesデータの取得に失敗しました:", err),
    });
  }, [isLicenseLoaded]);

  if (!isLicenseLoaded) {
    return <div>Loading license...</div>;
  }

  const handleUpdate = async () => {
    const edited = invoices.itemsEdited;
    const added = invoices.itemsAdded;
    const removed = invoices.itemsRemoved;

    if (edited.length === 0 && added.length === 0 && removed.length === 0) {
      alert("変更されたデータがありません。");
      return;
    }

    try {
      // 変更されたデータがあれば更新
      for (const item of edited) {
        if (isValidInvoice(item)) {
          await client.models.Invoices.update(item);
        }
      }

      // 追加されたデータがあれば登録
      for (const item of added) {
        if (isValidInvoice(item)) {
          await client.models.Invoices.create(item);
        }
      }

      // 削除されたデータがあれば削除
      for (const item of removed) {
        if (item.InvoiceID) {
          await client.models.Invoices.delete({
            InvoiceID: item.InvoiceID
          });
        }
      }

      if (edited.length) alert(`${edited.length}件のデータを更新しました。`);
      if (added.length) alert(`${added.length}件のデータを登録しました。`);
      if (removed.length) alert(`${removed.length}件のデータを削除しました。`);
    } catch (err) {
      console.error("更新中にエラーが発生しました。:", err);
      alert("更新中にエラーが発生しました。");
    } finally {
      invoices.clearChanges();
    }
  };

  return (
    <div>
      <div>
        <button onClick={handleUpdate} className="btn">更新</button>
        <CollectionViewNavigator headerFormat="{currentPage:n0} / {pageCount:n0} ページ" byPage={true} cv={invoices}/>
      </div>
      <div>
        <WjGrid.FlexGrid itemsSource={invoices} allowAddNew={true} allowDelete={true}>
          <FlexGridFilter />
          <WjGrid.FlexGridColumn header="ID" binding="InvoiceID" width={70} />
          <WjGrid.FlexGridColumn header="請求書番号" binding="BillNo" width={150} />
          <WjGrid.FlexGridColumn header="伝票番号" binding="SlipNo" width={150} />
          <WjGrid.FlexGridColumn header="顧客ID" binding="CustomerID" width={100} />
          <WjGrid.FlexGridColumn header="顧客名" binding="CustomerName" width={200} />
          <WjGrid.FlexGridColumn header="商品" binding="Products" width={250} />
          <WjGrid.FlexGridColumn header="数量" binding="Number" width={80} />
          <WjGrid.FlexGridColumn header="単価" binding="UnitPrice" width={100} format="c" />
          <WjGrid.FlexGridColumn header="日付" binding="Date" width={120} />
        </WjGrid.FlexGrid>
      </div>
    </div>
  );
};

export default FlexGrid;
