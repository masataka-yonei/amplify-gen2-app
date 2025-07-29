"use client";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";

import { fetchAuthSession } from "aws-amplify/auth";
import type { ViewerWrapperProps } from "../../components/ReportViewer";


// 動的インポートを使用して、レポートビューワのラッパーをロードします。詳細については、「https://nextjs.org/docs/advanced-features/dynamic-import」を参照してください。
import dynamic from "next/dynamic";
const Viewer = dynamic<ViewerWrapperProps>(
  async () => {
    return (await import("../../components/ReportViewer")).default;
  },
  { ssr: false }
);



const Home: NextPage = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const session = await fetchAuthSession();
        // fetchAuthSession()の返り値からidTokenまたはaccessTokenを取得
        const accessToken = session.tokens?.accessToken?.toString();
        setToken(accessToken ?? null);
        console.log("Access Token:", accessToken);
      } catch (e) {
        setToken(null);
      }
    };
    fetchToken();
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Viewer
        reportUri="reports/Invoice_green.rdlx-json"
        language="ja"
        reportParams={{ Name: "Bearer", Value: token }}
      />
    </div>
  );
};

export default Home;