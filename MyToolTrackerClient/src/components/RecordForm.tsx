import * as React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z, ZodTypeAny } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomSelect from "@/components/CustomSelect";
import useOpenState from "@/hooks/useOpenState";

import {
  TextField,
  Button,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import FormSuccessSnackbar from "./FormSuccessSnackbar";

// Explanation of the RecordForm component
// The RecordForm component is a reusable form component that can be used to create or update records.
// The component takes in the following props:
// - schema: a Zod schema that defines the shape of the data that the form will accept
// - defaultValues: the default values for the form fields
// - inputFields: an object that defines the form fields and their types
// - fetchData: a function that fetches the data after a record is added or updated
// - isUpdate: a boolean flag that indicates whether the form is for updating a record
// - addRecord: a function that adds a new record
// - updateRecord: a function that updates an existing record
// - options: an object that contains the options for select fields
// - recordType: a string that represents the type of record being added or updated
// The component uses the react-hook-form library to handle form state and validation.
// It renders the form fields based on the inputFields prop and handles form submission using the handleSubmit function from react-hook-form.
// The onSubmit function calls the addRecord or updateRecord function based on the isUpdate flag and resets the form after submission.
// The component also displays a success snackbar after a record is added or updated.
// The CustomSelect component is used to render select fields with options from the options prop.

interface FormProps<T> {
  schema: ZodTypeAny;
  defaultValues?: T;
  inputFields: Record<keyof T, { type: string; label: string }>;
  fetchData?: () => void;
  isUpdate?: boolean;
  addRecord: (data: T) => Promise<void>;
  updateRecord: (data: T) => Promise<void>;
  options?: any;
  recordType: string;
}

interface FormData {
  [key: string]: string;
}

const RecordForm: React.FC<FormProps<any>> = ({
  schema,
  defaultValues,
  inputFields,
  fetchData,
  isUpdate,
  addRecord,
  updateRecord,
  options,
  recordType,
}) => {
  // Custom hook for snackbar
  const {
    isOpen: isSnackbarOpen,
    open: openSnackbar,
    close: closeSnackbar,
  } = useOpenState();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: defaultValues,
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      if (isUpdate) {
        data.id = defaultValues ? defaultValues?.id : 0;
        await updateRecord(data);
      } else {
        await addRecord(data);
      }
      if (fetchData !== undefined) {
        fetchData();
      }
      reset();
      openSnackbar();
    } catch (error) {
      setError("root", {
        message: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {Object.entries(inputFields).map(([key, inputField], index) => {
        if (inputField["type"] === "text") {
          return (
            <TextField
              key={index}
              {...register(key)}
              label={errors[key] ? errors[key]?.message : inputField["label"]}
              error={errors[key] ? true : false}
              margin="normal"
              fullWidth
            />
          );
        } else if (inputField["type"] === "number") {
          return (
            <TextField
              key={index}
              {...register(key, {
                valueAsNumber: true,
              })}
              label={errors[key] ? errors[key]?.message : inputField["label"]}
              error={errors[key] ? true : false}
              margin="normal"
              type="number"
              fullWidth
            />
          );
        } else if (inputField["type"] === "select") {
          return (
            <CustomSelect
              key={index}
              formState={{ register, errors }}
              options={options[key]}
              fieldName={key}
              label={inputField["label"]}
            />
          );
        }
        return <div key={index}>{`${key} ${inputField["label"]}`}</div>;
      })}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          disabled={isSubmitting}
          sx={{ height: "56px", mt: "16px" }}
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          {isSubmitting ? (
            <CircularProgress color="secondary" />
          ) : (
            <Typography fontWeight="bold">
              {isUpdate ? `Update ${recordType}` : `Add ${recordType}`}
            </Typography>
          )}
        </Button>
      </Box>
      {errors.root && (
        <Box sx={{ color: "red", mt: "16px" }}>{errors.root.message}</Box>
      )}

      <FormSuccessSnackbar
        isOpen={isSnackbarOpen}
        close={closeSnackbar}
        message={
          isUpdate
            ? `${recordType} updated successfully!`
            : `${recordType} added successfully!`
        }
      />
    </form>
  );
};

export default RecordForm;
