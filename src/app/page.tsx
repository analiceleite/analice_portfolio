import { Metadata } from "next";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Homepage() {
  const client = createClient();
  // Obtém a página 'homepage'
  const page = await client.getSingle("homepage");

  return (
    <main>
      {/* Renderiza os slices da página 'homepage' */}
      <SliceZone slices={page.data.slices} components={components} />
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("homepage");

  return {
    title: page.data.meta_title || "Analice's Portfólio", 
    description: page.data.meta_description || "See my portfólio", 
  };
}
