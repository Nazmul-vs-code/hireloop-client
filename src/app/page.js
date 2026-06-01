import Hero from "@/components/Hero";
import State from "@/components/State";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 my-10">

      
      <Hero />
      <State />
    </div>
  );
}
