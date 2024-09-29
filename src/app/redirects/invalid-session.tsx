import React from "react";
import Link from "next/link";
const InvalidSession = () => {
  return (
    <div>
      <div>Invalid Session</div>
      <Link href={"/"}>
        <button className="m-5 border-2 bg-zinc-300/10 p-3">Go back</button>
      </Link>
    </div>
  );
};

export default InvalidSession;
