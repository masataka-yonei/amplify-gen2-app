'use client'
import dynamic from 'next/dynamic'



const FlexGrid = dynamic(
    () => {
        return import("../../components/FlexGrid");
    },
    { ssr: false }
);

export default function Home() {
    return (
        <div>
            <h1>
                Amplify Gen2 x Wijmo サンプル
            </h1>
            <FlexGrid />
        </div>
    )
}