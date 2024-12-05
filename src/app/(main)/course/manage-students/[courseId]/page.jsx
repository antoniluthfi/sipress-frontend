"use client";

import SelectLecturerInput from "@/components/course-page/select-lecturer-input";
import SelectStudentInput from "@/components/course-page/select-student-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { useAuthenticateUser } from "@/lib/api/useAuthenticateUser";
import { useUserCoursesList } from "@/lib/api/useUserCoursesList";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, X } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  lecturer_id: z.number().min(1, { message: "Dosen harus diisi." }),
  student_id: z.number().min(1, { message: "Mahasiswa harus diisi." }),
});

const ManageStudentsPage = () => {
  const pathname = usePathname();
  useAuthenticateUser({ authenticatedRedirectRoute: pathname });

  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      lecturer_id: "",
      student_id: "",
    },
  });
  const { data } = useUserCoursesList({
    limit: 100,
    course_id: Number(params?.courseId),
  });

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const handleAddStudent = (student) => {
    if (!student) return; // Pastikan student valid
    const isStudentExist = selectedStudents.some(
      (selected) => selected?.id === student?.id
    );
    if (!isStudentExist) {
      setSelectedStudents((prevStudents) => [...prevStudents, student]);
    }
  };

  const handleRemoveStudent = (studentId) => {
    const updatedStudents = selectedStudents.filter(
      (student) => student?.id !== studentId
    );
    setSelectedStudents(updatedStudents);
  };

  useEffect(() => {
    if (data?.length) {
      setIsUpdateMode(true);
      const selectedLecturer = data?.find((user) => user?.role === "lecturer");
      form.setValue("lecturer_id", selectedLecturer?.user_id || "");

      const newStudents = data?.map((user) => ({
        id: user?.user_id,
        course_id: user?.course_id,
        name: user?.user_name,
      }));
      setSelectedStudents(newStudents);
    }
  }, [data?.length]);

  const onSubmit = async (data) => {
    try {
      const studentsPayload = selectedStudents?.map((student) => ({
        user_id: student?.id,
        course_id: Number(params?.courseId),
      }));

      const lecturerPayload = {
        user_id: data.lecturer_id,
        course_id: Number(params?.courseId),
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user-course`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([...studentsPayload, lecturerPayload]),
          credentials: "include",
        }
      );

      if (res.ok) {
        const response = await res.json();
        toast({
          title: "Success",
          description: response?.message || "Data created successfully",
          variant: "success",
        });
        router.back();
      } else {
        const errorData = await res.json();
        toast({
          title: "Failed",
          description:
            errorData?.error ||
            errorData?.errors?.[0]?.msg ||
            "Something went wrong",
          variant: "danger",
        });
      }
    } catch (err) {
      console.error("An error occurred:", err);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "danger",
      });
    }
  };

  return (
    <div className="h-auto w-full flex flex-1 flex-col gap-5 lg:gap-10">
      <div className="flex items-center gap-3">
        <button onClick={() => router.push("/course")}>
          <ArrowLeftIcon />
        </button>
        <h3 className="text-xl lg:text-3xl text-[#253763] font-semibold">
          Atur Mahasiswa
        </h3>
      </div>
      <Card className="w-full">
        <CardContent className="flex flex-col p-2 lg:p-5 gap-2 lg:gap-5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6 flex flex-col items-end"
            >
              <div className="w-full grid grid-flow-row lg:grid-cols-2 gap-5 items-center">
                <FormField
                  control={form.control}
                  name="lecturer_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dosen</FormLabel>
                      <FormControl>
                        <SelectLecturerInput
                          ref={field.ref}
                          value={field.value}
                          onSelectOption={(val) => {
                            form.setValue("lecturer_id", Number(val));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="student_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mahasiswa</FormLabel>
                      <FormControl>
                        <SelectStudentInput
                          ref={field.ref}
                          value={field.value}
                          onSelectOption={(val) => {
                            form.setValue("student_id", Number(val?.id));
                            handleAddStudent(val);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Daftar mahasiswa yang telah dipilih */}
              <div className="w-full space-y-2">
                <h4 className="text-lg font-medium">Peserta Mata Kuliah:</h4>
                <ul className="flex items-center gap-3 w-full">
                  {selectedStudents?.map((student) => (
                    <li
                      key={student?.id}
                      className="flex justify-between items-center gap-2 border-[1px] rounded-md w-fit"
                    >
                      <p className="ml-4">{student?.name}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveStudent(student?.id)}
                      >
                        <X />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>

              <Button variant="default">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default memo(ManageStudentsPage);
