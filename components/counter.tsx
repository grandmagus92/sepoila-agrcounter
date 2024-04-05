import { TransactionButton, useReadContract } from "thirdweb/react"
import { CONTRACT } from "../utils/constants";
import { prepareContractCall } from "thirdweb";
import Image from "next/image";

const Counter: React.FC = () =>{
    const {data: count, isLoading:loadingCount,refetch} = useReadContract({
        contract: CONTRACT,
        method:"getCount"
    });
    return(
        <div style={{marginTop:"100px",fontSize:"40px"}}>
          <div  style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100hv",}}>
          <Image
      src="/agr.png"
      width={300}
      height={300}
      alt="Picture of the author"
    />
          </div>
            Your count
            {loadingCount ? (
                <h2>..</h2>
            ):(
                <h2 style={{fontSize:"40px"}}>{count?.toString()}</h2>
            )}
            <div style={{
                display:"flex",
                justifyContent:"center",
                gap:"10px",
                marginTop:"30px"
            }}>
                <TransactionButton
                transaction={()=> prepareContractCall({
                    contract: CONTRACT,
                    method:"decrement"
                })}
                style={{color:"white",backgroundColor:"red",width:"60px",height:"50px"}}
                onTransactionSent={()=> console.log("decrementing....")}
                onTransactionConfirmed={()=>refetch()}
                >-</TransactionButton>
                <TransactionButton
                transaction={()=>prepareContractCall({
                    contract: CONTRACT,
                    method:"increment"
                })}
                style={{color:"white",backgroundColor:"green",width:"60px",height:"50px"}}
                onTransactionSent={()=>console.log("incrementing....")}
                onTransactionConfirmed={()=>refetch()}
                >+</TransactionButton>
            </div>
            </div>
    )
};
export default Counter;