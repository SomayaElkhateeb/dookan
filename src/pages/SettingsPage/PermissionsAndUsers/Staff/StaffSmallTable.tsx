import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import CustomTableBodyCheckbox from 'src/app/components/optimized/UiKits/CustomTableBodyCheckbox';
import Avatar from 'src/app/components/optimized/UiKits/Avatar';
import { useTranslation } from 'react-i18next';
import CustomTableHeaderCheckbox from 'src/app/components/optimized/UiKits/CustomTableHeaderCheckbox';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'white',
  borderRadios: "30px",
  overflow: "hidden",
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  borderRadios: "30px",
  overflow: "hidden",
    backgroundColor: '#f9fafc',

}));

export default function StaffSmallTable({
  data,
  handelId,
  isLoading,
  children,
}: {
  data: User[];
  handelId: (e: string) => void;
  children: React.ReactNode;
  isLoading: boolean;
}) {
  const { t } = useTranslation();
  const [array, setArray] = React.useState<string[]>([]);

  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <Box className="flex flex-col gap-4">
      {/* header */}
      <Box className="flex-row-global gap-4 bg-white rounded-md py-2 px-4">
      <CustomTableHeaderCheckbox
					array={array}
					setArray={setArray}
					mainArray={data?.map((e) => e.id)}
				/>
        <Typography className='text-subtitle text-sm'>{t("STAFF NAME")}</Typography>
      </Box>
      {data.map((user, index) => (
        <Accordion
          key={user.id}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
        >
          <AccordionSummary
            aria-controls={`panel${index}d-content`}
            id={`panel${index}d-header`}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
              <Box sx={{ display: "flex" }}>
                <CustomTableBodyCheckbox array={array} setArray={setArray} id={user.id} />
                <Avatar fullName={user.name} />
                <Typography sx={{ margin: "8px" }} className='title'>{user.name}</Typography>
              </Box>

              <Typography>{children}</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails className="flex-row-global gap-10">
            <Box className="flex flex-col gap-4">
              <Typography className='text-subtitle text-sm'>{t("ROLE")}</Typography>
              <Typography className='text-subtitle text-sm'>{t("STATUS")}</Typography>
              <Typography className='text-subtitle text-sm'>{t("EMAIL")}</Typography>

            </Box>

            <Box className="flex flex-col gap-4">
              <Typography className='text-title text-sm'>{user.role.name}</Typography>
              <Typography className='text-title text-sm'>{user.status === 1 ? 'Active' : 'not Active'}</Typography>
              <Typography className='text-primary underline text-sm'>{user.email}</Typography>

            </Box>

        
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
