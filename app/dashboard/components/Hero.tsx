import { Separator } from "@/components/ui/separator";

function Hero({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <h1 className="font-semibold text-lg text-zinc-700">{title}</h1>
      <p className=" text-zinc-600">{content}</p>

      <Separator className="my-5" />
    </div>
  );
}

export default Hero;
