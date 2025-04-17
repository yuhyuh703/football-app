import { useEffect } from "react";
import { fetchTransfersLatest } from "@/lib/api";

export default function Transfers() {


  useEffect(() => {
    console.log(fetchTransfersLatest())
  }, []);


}