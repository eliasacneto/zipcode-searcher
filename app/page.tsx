"use client";

import { useState, ChangeEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";

interface ZipCodeData {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  [key: string]: string;
}

export default function Home() {
  const [cep, setCep] = useState<string>("");
  const [cepData, setCepData] = useState<ZipCodeData | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const zipMask = (zipcode: string): string => {
    if (zipcode.length === 5) {
      return zipcode + "-";
    }
    return zipcode;
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const maskedValue = zipMask(event.target.value.replace("-", ""));
    setCep(maskedValue);
  };

  const handleSearch = async (): Promise<void> => {
    console.log("aqui");
    if (cep.length !== 8 || isNaN(Number(cep))) {
      setError("Please, set a valid zipcode with 8 digits");
      return;
    }

    setLoading(true);
    setError("");
    setCepData(null);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json`);
      if (!response.ok) {
        throw new Error("Error on request!");
      }
      const data: ZipCodeData = await response.json();
      if ("erro" in data) {
        setError("Sorry, I couldn't find this Zipcode! 😕 ");
      } else {
        setCepData(data);
      }
    } catch (err) {
      setError("Error to find Zipcode");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-screen flex flex-col justify-between ">
      <Header />
      <div className="flex flex-col justify-center mx-8 gap-8 lg:flex-row">
        <div className="mt-1 mb-auto ">
          <Card className="min-w-[350px] shadow-xl">
            <CardHeader>
              <CardTitle>📍 Search your address</CardTitle>
              <CardDescription>
                Type below your zip code to get more information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
              >
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="cep">Brazilian zip code:</Label>
                    <Input
                      type="text"
                      value={cep}
                      onChange={handleChange}
                      id="cep"
                      placeholder="Eg.: 63047-310"
                      maxLength={8}
                    />
                  </div>
                  {error && (
                    <div className="mt-2 text-center">
                      <p style={{ color: "red", fontWeight: "bold" }}>
                        {error}
                      </p>
                    </div>
                  )}
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={handleSearch} disabled={loading}>
                {loading ? "🔄 Loading..." : "🔎 Search"}
              </Button>
            </CardFooter>
          </Card>
        </div>

        {cepData && (
          <div className=" flex mt-8 shadow-xl">
            <Card className="">
              <Table>
                <TableCaption className="pb-1">
                  Results of your search.
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px] font-bold">
                      Street/Avenue
                    </TableHead>
                    <TableHead className="font-bold">Neighborhood</TableHead>
                    <TableHead className="font-bold">Location</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      {cepData.logradouro}
                    </TableCell>
                    <TableCell>{cepData.bairro}</TableCell>
                    <TableCell>
                      {cepData.localidade}/{cepData.uf}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </div>
        )}
      </div>
      <footer className="h-20 flex gap-2 flex-col w-full justify-center">
        <h1 className="text-center text-sm">
          Developed by{" "}
          <a
            href="https://eliasacneto.vercel.app"
            target="_blank"
            className="font-bold  hover:text-red-500 transition-all duration-500"
          >
            @eliasacneto
          </a>
        </h1>
        <h3 className="text-center text-sm">
          Credits:{" "}
          <a
            href="https://viacep.com.br/"
            target="_blank"
            className="font-bold hover:text-red-500 transition-all duration-500"
          >
            ViaCEP API
          </a>{" "}
        </h3>
      </footer>
    </main>
  );
}
