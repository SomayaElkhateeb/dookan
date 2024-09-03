import { feeFormat } from "./utils";

interface FeeDisplayProps {
  planOne: string | number;
  planTwo?: string | number;
}

export default function FeeDisplay({ planOne, planTwo }:FeeDisplayProps)  {
  return (
    <span className='paragraph capitalize'>
      {feeFormat(planOne)}
      {planTwo && <span> - {feeFormat(planTwo)}</span>}
    </span>
  );
};


