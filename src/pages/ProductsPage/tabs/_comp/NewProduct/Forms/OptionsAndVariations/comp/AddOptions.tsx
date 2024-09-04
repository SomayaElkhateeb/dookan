
import { GlobalDialog } from "src/app/components/shared";
import { Form } from "src/app/components/ui/form";
import SelectFormField from "src/app/components/ui/form/SelectFormField";
import { useForm } from "src/app/utils/hooks/form";

const AddOptions = ({ openDialog, setOpenDialog }: { openDialog: boolean; setOpenDialog: () => void }) => {

    const handleClose = () => {
        setOpenDialog(false);
    };

    const dialogStyle = {
        width: { lg: '50%', md: '70%', xs: '90%' },
        height: { md: '600px', xs: '600px' },
    };

    const { formStore, onSubmit } = useForm({
        // schema: rolesSchema,
        // handleSubmit: handleSubmit,
        // defaultValues: handelDefaultValue(),
    });

    return (
        <Form {...formStore}>
            <form onSubmit={onSubmit}>
                <GlobalDialog openDialog={openDialog} handleClose={handleClose} style={dialogStyle}>
                    <div className='grid md:grid-cols-2 grid-cols-1'>
                        <SelectFormField
                            formStore={props.formStore}
                            name={`variants[${i}].code`}
                            placeholder={t('Attribute Name')}
                            label={t('Attribute Name')}
                            AnotherName={`variants[${i}].attributeValues`}
                            options={
                                attributes?.length > 0
                                    ? attributes?.map((e) => {
                                        return {
                                            value: e.code,
                                            label: e.name,
                                        };
                                    })
                                    : []
                            }
                        />
                    </div>
                </GlobalDialog>
            </form>
        </Form>
    )
}

export default AddOptions;
