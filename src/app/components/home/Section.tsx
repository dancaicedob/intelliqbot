import Link from 'next/link';

interface SectionProps {
  id: string;
  title: string;
  description: string;
  link: string;
}

export default function Section({ id, title, description, link }: SectionProps) {
  return (
    <section
      id={id}
      className="min-h-screen flex items-center justify-center p-8"
    >
      <Link
        href={link}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl hover:bg-gray-700 transition-all"
      >
        <h2 className="text-4xl font-bold text-white">{title}</h2>
        <p className="text-gray-400 mt-4">{description}</p>
      </Link>
    </section>
  );
}