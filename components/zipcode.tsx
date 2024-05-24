"use client";
import React, { useEffect, useState } from "react";
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

import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Zipcode = () => {
  return (
    <>
      <div className=" flex justify-center mt-20">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle> 📍 Search your address</CardTitle>
            <CardDescription>
              Type below your zipcode to get more information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="name">Zipcode:</Label>
                  <Input id="name" placeholder="Eg.: 63047-310" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            {/* <Button variant="outline">Cancel</Button> */}
            <Button> 🔎 Search</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-20">
        <Card className="mx-8 ">
          <Table>
            <TableCaption className="mb-2">
              Results of your search.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] font-bold">
                  Public Place
                </TableHead>
                <TableHead className="font-bold">Neighborhood</TableHead>
                <TableHead className="font-bold">Location</TableHead>
                {/* <TableHead className="text-right">Amount</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Rua</TableCell>
                <TableCell>Bairro</TableCell>
                <TableCell>UF</TableCell>
                {/* <TableCell className="text-right">
                  {invoice.totalAmount}
                </TableCell> */}
              </TableRow>
            </TableBody>
            {/* <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter> */}
          </Table>
        </Card>
      </div>
    </>
  );
};

export default Zipcode;
