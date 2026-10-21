"use client";

import { useState, useEffect, useCallback, useContext } from "react";
import { IDesignContext, DesignContext } from '../designContext';
import { LoadingIndicator, DesignOutput, Viewer3d } from '../components'
import Link from 'next/link';
import Image from 'next/image';
import img from '../../public/file_download.svg'



export default function Page() {
   //Read context
   const idesignContext: IDesignContext = useContext(DesignContext);
   //output declarations
   const [submit, setSubmit] = useState(2)
   const [pdb_text, setPdb_text] = useState("")
   const [pdb_link, setPdb_link] = useState("")
   const [invalidInput, setInvalidInput] = useState(false)
   const [response, setdata] = useState({
        sequence: "",
        key_strand: "",
        full_sequence: "",
        generated_structure: "",
        original_structure: "",
        mfe: "",
        filepath: ""
    });
    //Loading indicator
    const [isDataLoading, setIsDataLoading] = useState(false);
    //Backend selector
    const [isAROS, setIsAROS] = useState(false);
    const [isRL2, setIsRL2] = useState(false);
    
    const handleSubmit = useCallback(async () => {
        if (submit == 2) {
            return
        }
        else {
        setIsDataLoading(true)

        await fetch("/api/construct", {
                method: "POST",
                headers: { "Content-type": "application/json"},
                //Match inputs here
                body: JSON.stringify({
                    use_aros:isAROS,
                    use_RL2:isRL2,
                    miRNA1: idesignContext.miRNA_list[0],
                    miRNA2: idesignContext.miRNA_list[1],
                    protein: idesignContext.protein
                })
            }).then((res) =>
                res.json().then((data) => {
                    setdata({
                        sequence: data.sequence,
                        key_strand: data.key_strand,
                        full_sequence: data.full_sequence,
                        generated_structure: data.generated_structure,
                        original_structure: data.original_structure,
                        mfe: data.mfe,
                        filepath: data.filepath
                    });
                    fetch("/api/pdb", {
                    method: "POST",
                    headers: { "Content-type": "application/json"},
                    //Match inputs here
                    body: JSON.stringify({
                    seq: data.sequence,
                    structure: data.generated_structure
                })
            }).then((res) => res.json().then((pdb_data) => setPdb_text(pdb_data.pdb)))
                })
            );
            setIsDataLoading(false);
            
}} , [submit])

  useEffect(() => {handleSubmit()}, [handleSubmit]);


    function handleButtonSubmit(e: any) {
        if (idesignContext.miRNA_list.some(function(e){ return e == "";})) {
            setInvalidInput(true)
        }   
        else {
            setInvalidInput(false)
            setSubmit(submit == 2 ? 1 : -submit);
        }
    }
    //Demo1 paramteres
    function handleDemo1() {
        idesignContext.setMiRNA_list(["UAGCUUAUCAGACUGAUGUUGACU", "UGGAGUGUGACAAUGGUGUUUG"])
        idesignContext.setProtein("CCATGGGTAAGGGAGAGGAACTTTTCACTGGAGTTGTCCCAATCTTGGTTGAGCTCGACGGTGACGTCAATGGACACAAGTTTTCCGTCTCAGGAGAGGGTGAAGGTGATGCAACCTACGGAAAGTTGACCCTTAAGTTCATCTGCACTACTGGAAAACTCCCTGTTCCTTGGCCAACATTGGTGACCACTTTCTCTTACGGTGTTCAATGCTTCTCACGTTACCCAGACCATATGAAGCGTCATGACTTTTTCAAGTCCGCCATGCCCGAGGGTTATGTGCAAGAGCGTACTATCTTCTTCAAGGACGACGGAAACTACAAGACACGTGCCGAAGTCAAGTTCGAAGGTGACACCTTGGTGAACAGAATCGAGTTGAAGGGTATCGATTTCAAGGAGGACGGAAACATTCTTGGACACAAGCTTGAGTACAACTACAACTCACACAATGTGTACATCATGGCTGACAAGCAGAAGAACGGAATCAAGGTTAACTTCAAAATCCGTCACAACATTGAGGATGGAAGCGTTCAGTTGGCTGATCACTACCAACAGAATACTCCAATTGGCGATGGCCCTGTGCTTTTGCCAGACAACCACTACTTGTCCACCCAATCTGCCCTTTCCAAAGATCCCAACGAAAAGAGAGACCACATGGTCTTGCTTGAGTTTGTGACCGCTGCTGGCATTACCCACGGCATGGATGAGTTGTACAAGTAAGGATCC")
    }
    useEffect(() => {
        if (pdb_link != "") URL.revokeObjectURL(pdb_link);
        setPdb_link(URL.createObjectURL(new Blob([pdb_text], { type: "chemical/x-pdb" })));
    },
    [pdb_text]);

    function handleCheckbox() {
        setIsAROS(!isAROS)
    }

  return (
    <main className="flex min-h-screen max-h-screen flex-col items-center justify-around p-10 overflow-y-auto gap-5">
    <h1 className="mb-4 text-2xl font-bold tracking-tight text-heading md:text-4xl lg:text-5xl">Design page</h1>
    <p>Here you can construct the final design using your selected miRNAs and protein from the previous pages by simply clicking the "Construct design" button. 
        The "Demo data" button gives predefined values for miRNAs and protein, so by then clicking the "Construct design" button, the system can be easily inspected. The construction of the design may take some time.</p>
    <button onClick={handleDemo1} className="py-4 px-4 rounded-full transition-colors bg-white hover:bg-[#383838] dark:hover:bg-[#ccc]">Demo data 1</button>
    {invalidInput && <p className="text-red-500">Invalid input: some miRNAs have length 0</p>}
    <div className="flex flex-row items-center gap-8">
    
    <button onClick={handleButtonSubmit} className="py-4 px-4 rounded-full transition-colors bg-white hover:bg-[#383838] dark:hover:bg-[#ccc]">Construct the design!</button>
     
     <div className="inline-flex rounded-xl bg-white/20 p-1.5 backdrop-blur-md border border-white/30 shadow-inner">
      <span
        onClick={() => setIsRL2(false)}
        className={`rounded-lg px-6 py-3 text-base font-semibold transition-all duration-200 ${
          !isRL2
            ? "bg-white text-blue-900 shadow-md"
            : "text-blue-900/70 hover:text-blue-950 hover:bg-white/10"
        }`}
      >
        RiboLogic 3 (RL3)
      </span>
      <span
        onClick={() => setIsRL2(true)}
        className={`rounded-lg px-6 py-3 text-base font-semibold transition-all duration-200 ${
        isRL2
            ? "bg-white text-blue-900 shadow-md"
            : "text-blue-900/70 hover:text-blue-950 hover:bg-white/10"
        }`}
      >   
        RiboLogic 2 (RL2)
      </span>
    </div>

     {!isRL2 && <label>Use AROS backend:
        <input 
          type="checkbox" 
          name="onion" 
          checked={isAROS} 
          onChange={handleCheckbox}
        />
      </label>}
    </div>
     {isDataLoading && <LoadingIndicator />}
     {!isDataLoading && submit !=2 && <DesignOutput sequence={response.sequence} key_strand={response.key_strand} full_seq={response.full_sequence} gen_structure={response.generated_structure} original_structure={response.original_structure} mfe={response.mfe}/>}
    <div className="h-50 max-h-50 p-10">
     {!isDataLoading && (pdb_text != "") && submit !=2 && (<div className="flex flex-col">
        <div className="flex bg-gray-400 rounded -mb-16 z-40 justify-end ml-auto">
     <Link href={pdb_link}>
     <Image
          src={img}
          alt="PDB download logo"
          width={50}
          height={50}
          priority />
     </Link>
    </div>
     <div className="z-0"><Viewer3d url={pdb_link} /></div>
     </div>)}
    </div>

    </main>

  )
}