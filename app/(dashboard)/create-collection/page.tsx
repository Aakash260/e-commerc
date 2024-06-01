import React from "react";
import LargeSizeLayout from "@/components/layout/LargeScreenContainer";
import { CreateCollection } from "./components/CreateCollection";
const page = () => {
  
  return (
    <LargeSizeLayout>
      <div className="">
        <div className="text-4xl overflow-hidden">Create collection</div>
        <hr className="mt-4 mb-8 border-2 border-black" />
        <div className="form">
          <CreateCollection />
        </div>
      </div>
    </LargeSizeLayout>
  );
};

export default page;
