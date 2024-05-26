"use client";
import withAuth from "@/hoc/withAuth";

const Home = () => {
  return (
    <main>
      <h1>MyToolTracker</h1>
    </main>
  );
};

export default withAuth(Home);
