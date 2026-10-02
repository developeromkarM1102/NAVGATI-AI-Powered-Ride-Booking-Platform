interface RideTagProps {
  text: string;
}

export default function RideTag({ text }: RideTagProps) {
  return <span className="rounded-full bg-slate-100 px-3 py-1 text-[9px] font-semibold capitalize text-slate-600">{text}</span>;
}