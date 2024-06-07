import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

// const registerSchema = yup.object().shape({
//   firstName: yup
//     .string()
//     .required("First name is required")
//     .min(2, "First name must be at least 2 characters")
//     .max(50, "First name must be at most 50 characters"),
//   lastName: yup
//     .string()
//     .required("Last name is required")
//     .min(2, "Last name must be at least 2 characters")
//     .max(50, "Last name must be at most 50 characters"),
//   email: yup
//     .string()
//     .email("Invalid email format")
//     .required("Email is required"),
//   password: yup
//     .string()
//     .required("Password is required")
//     .min(8, "Password must be at least 8 characters")
//     .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
//     .matches(/[a-z]/, "Password must contain at least one lowercase letter")
//     .matches(/[0-9]/, "Password must contain at least one number")
//     .matches(/[@$!%*?&#]/, "Password must contain at least one special character"),
//   location: yup
//     .string()
//     .required("Location is required")
//     .max(100, "Location must be at most 100 characters"),
//   picture: yup
//     .string()
//     .required("Picture URL is required")
//     .url("Invalid URL format for picture"),
//   twitterLink: yup
//     .string()
//     .required("Twitter link is required")
//     .url("Invalid URL format for Twitter link"),
//   linkedinLink: yup
//     .string()
//     .required("LinkedIn link is required")
//     .url("Invalid URL format for LinkedIn link"),
//   phoneNumber: yup
//     .string()
//     .required("Phone number is required")
//     .matches(/^\+?[1-9]\d{1,14}$/, "Phone number must be a valid international phone number"),
// });

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  picture: yup.string().required("required"),
  twitterLink: yup.string().required("required"),
  linkedinLink:yup.string().required("required"),
  phoneNumber: yup.string().required("required"),
  securityQuestion:yup.string().required("required"),
  securityAnswer:yup.string().required("required")
});
const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().required("Password is required"),
});
const VerifyEmailSchema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
});

const resetPasswordSchema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  securityAnswer: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be at most 50 characters"),
  password: yup
    .string()
    .required("Password is required")
    // .min(8, "Password must be at least 8 characters")
    // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    // .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    // .matches(/[0-9]/, "Password must contain at least one number")
    // .matches(/[@$!%*?&#]/, "Password must contain at least one special character"),
});



const initialValuesResetPassword = {
  securityAnswer:"",
  email:"",
  password: "",
};



const intialValuesVerifyEmail={
  email:""
}

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  phoneNumber: "",
  twitterLink: "",
  linkedinLink: "",
  securityQuestion:"",
  securityAnswer:"",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const isResetPasswordSecurity = pageType === "resetPasswordSecurity";
  const isVerifyEmail =pageType==="verifyEmail";

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
      console.log("User registeretd")
    }else{
      console.log("Oombi myr")
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

 
  const VerifyEmail = async (values, onSubmitProps) => {
    try {
      const response = await fetch("http://localhost:3001/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      onSubmitProps.resetForm();
      if (result.success) {
        alert("Email Verified");
        setSecurityQuestion(result.securityQuestion);
        setPageType("resetPasswordSecurity");
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error in VerifyEmail:", error);
      alert("An error occurred while verifying the email.");
    }
  };
  const resetPasswordSecurity = async (values, onSubmitProps) => {
    const response = await fetch("http://localhost:3001/auth/reset-password-security", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const result = await response.json();
    onSubmitProps.resetForm();
    if (result.success) {
      alert("Password has been reset successfully");
      setPageType("login");
    } else {
      alert("Error resetting password");
    }
  };

  // const handleFormSubmit = async (values, onSubmitProps, setSecurityQuestion) => {
  //   if (isLogin) await login(values, onSubmitProps);
  //   if (isRegister) await register(values, onSubmitProps);
  //   if (isResetPasswordSecurity) await resetPasswordSecurity(values, onSubmitProps);
  //   if(isVerifyEmail) await VerifyEmail(values, onSubmitProps, setSecurityQuestion);
  // };
  const handleFormSubmit = async (values, onSubmitProps) => {
    try {
      if (isLogin) {
        await login(values, onSubmitProps);
      } else if (isRegister) {
        await register(values, onSubmitProps);
      } else if (isResetPasswordSecurity) {
        await resetPasswordSecurity(values, onSubmitProps);
      } else if (isVerifyEmail) {
        await VerifyEmail(values, onSubmitProps);
      }
    } catch (error) {
      console.error("Error in handleFormSubmit:", error);
      alert("An error occurred while processing the form.");
    }
  };
  

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={
        isLogin
          ? initialValuesLogin
          : isVerifyEmail
          ? intialValuesVerifyEmail
          : isResetPasswordSecurity
          ? initialValuesResetPassword
          : initialValuesRegister
      }
      validationSchema={
        isLogin
          ? loginSchema
          : isVerifyEmail
          ? VerifyEmailSchema
          : isResetPasswordSecurity
          ? resetPasswordSchema
          : registerSchema
      }
    >
      {({
       values,
       errors,
       touched,
       handleBlur,
       handleChange,
       handleSubmit,
       setFieldValue,
       resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {isRegister && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{
                    gridColumn: "span 2",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "primary.main", // Set the border color to primary.main
                      },
                      "&:hover fieldset": {
                        borderColor: "primary.main", // Set the border color to primary.main on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "primary.main", // Set the border color to primary.main when focused
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "primary.main", // Set the label text color to primary.main
                    },
                    "& input": {
                      color: "white", // Set the text color inside the TextField to white
                    },
                  }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{
                    gridColumn: "span 2",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "primary.main", // Set the border color to primary.main
                      },
                      "&:hover fieldset": {
                        borderColor: "primary.main", // Set the border color to primary.main on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "primary.main", // Set the border color to primary.main when focused
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "primary.main", // Set the label text color to primary.main
                    },
                    "& input": {
                      color: "white", // Set the text color inside the TextField to white
                    },
                  }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{
                    gridColumn: "span 4",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "primary.main", // Set the border color to primary.main
                      },
                      "&:hover fieldset": {
                        borderColor: "primary.main", // Set the border color to primary.main on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "primary.main", // Set the border color to primary.main when focused
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "primary.main", // Set the label text color to primary.main
                    },
                    "& input": {
                      color: "white", // Set the text color inside the TextField to white
                    },
                  }}
                />
                <TextField
                  label="Phone Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phoneNumber}
                  name="phoneNumber"
                  error={
                    Boolean(touched.phoneNumber) && Boolean(errors.phoneNumber)
                  }
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  sx={{
                    gridColumn: "span 4",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "primary.main", // Set the border color to primary.main
                      },
                      "&:hover fieldset": {
                        borderColor: "primary.main", // Set the border color to primary.main on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "primary.main", // Set the border color to primary.main when focused
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "primary.main", // Set the label text color to primary.main
                    },
                    "& input": {
                      color: "white", // Set the text color inside the TextField to white
                    },
                  }}
                />
                <TextField
                  label="Twitter Link"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.twitterLink}
                  name="twitterLink"
                  error={
                    Boolean(touched.twitterLink) && Boolean(errors.twitterLink)
                  }
                  helperText={touched.twitterLink && errors.twitterLink}
                  sx={{
                    gridColumn: "span 4",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "primary.main", // Set the border color to primary.main
                      },
                      "&:hover fieldset": {
                        borderColor: "primary.main", // Set the border color to primary.main on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "primary.main", // Set the border color to primary.main when focused
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "primary.main", // Set the label text color to primary.main
                    },
                    "& input": {
                      color: "white", // Set the text color inside the TextField to white
                    },
                  }}
                />
                <TextField
                  label="LinkedIn Link"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.linkedinLink}
                  name="linkedinLink"
                  error={
                    Boolean(touched.linkedinLink) &&
                    Boolean(errors.linkedinLink)
                  }
                  helperText={touched.linkedinLink && errors.linkedinLink}
                  sx={{
                    gridColumn: "span 4",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "primary.main", // Set the border color to primary.main
                      },
                      "&:hover fieldset": {
                        borderColor: "primary.main", // Set the border color to primary.main on hover
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "primary.main", // Set the border color to primary.main when focused
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "primary.main", // Set the label text color to primary.main
                    },
                    "& input": {
                      color: "white", // Set the text color inside the TextField to white
                    },
                  }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>

                <TextField
              label="Security Question"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.securityQuestion}
              name="securityQuestion"
              error={Boolean(touched.securityQuestion) && Boolean(errors.securityQuestion)}
              helperText={touched.securityQuestion && errors.securityQuestion}
              sx={{
                gridColumn: "span 4",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "primary.main", // Set the border color to primary.main
                  },
                  "&:hover fieldset": {
                    borderColor: "primary.main", // Set the border color to primary.main on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main", // Set the border color to primary.main when focused
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "primary.main", // Set the label text color to primary.main
                },
                "& input": {
                  color: "white", // Set the text color inside the TextField to white
                },
              }}
            />

              </>
            )}
            {(isResetPasswordSecurity || isRegister) && (
              <>
        <TextField
              label="Security Answer"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.securityAnswer}
              name="securityAnswer"
              error={Boolean(touched.securityAnswer) && Boolean(errors.securityAnswer)}
              helperText={touched.securityAnswer && errors.securityAnswer}
              sx={{
                gridColumn: "span 4",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "primary.main", // Set the border color to primary.main
                  },
                  "&:hover fieldset": {
                    borderColor: "primary.main", // Set the border color to primary.main on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "primary.main", // Set the border color to primary.main when focused
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "primary.main", // Set the label text color to primary.main
                },
                "& input": {
                  color: "white", // Set the text color inside the TextField to white
                },
              }}
            />
          </>

            )}
            {(isLogin || isVerifyEmail || isResetPasswordSecurity || isRegister) && (
              <>
             
              <TextField
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={Boolean(touched.email) && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{
                  gridColumn: "span 4",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "primary.main", // Set the border color to primary.main
                    },
                    "&:hover fieldset": {
                      borderColor: "primary.main", // Set the border color to primary.main on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main", // Set the border color to primary.main when focused
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "primary.main", // Set the label text color to primary.main
                  },
                  "& input": {
                    color: "white", // Set the text color inside the TextField to white
                  },
                }}
              />
          </>

            )}
            {(isLogin || isRegister) && (
              <TextField
                label="Password"
                type="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={Boolean(touched.password) && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{
                  gridColumn: "span 4",
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "primary.main", // Set the border color to primary.main
                    },
                    "&:hover fieldset": {
                      borderColor: "primary.main", // Set the border color to primary.main on hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.main", // Set the border color to primary.main when focused
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "primary.main", // Set the label text color to primary.main
                  },
                  "& input": {
                    color: "white", // Set the text color inside the TextField to white
                  },
                }}
              />
            )}
           {isResetPasswordSecurity && (
              <>
                <Box>{securityQuestion}</Box>
                <TextField
                  label="New Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{
                    gridColumn: "span 4",
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "primary.main",
                      },
                      "&:hover fieldset": {
                        borderColor: "primary.main",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "primary.main",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "primary.main",
                    },
                    "& input": {
                      color: "white",
                    },
                  }}
                />
               
              </>
            )}
          </Box>

          {/* BUTTONS */}
         
          <Box>
          {(isLogin || isRegister || isVerifyEmail || isResetPasswordSecurity)&&
          <Button
          fullWidth
          type="submit"
          sx={{
            m: "2rem 0",
            p: "1rem",
            backgroundColor: palette.primary.main,
            borderRadius: "2rem",
            color: palette.background.alt,
            "&:hover": { color: palette.primary.main },
          }}
        >
           {isLogin
            ? "LOGIN"
            : isVerifyEmail
            ? "Verify Email"
            : isResetPasswordSecurity
            ? "Reset Password"
            : "REGISTER"}
        </Button>
          }
            {/* {isVerifyEmail && (
              <Button
              onClick={() => {
                setPageType("resetPasswordSecurity");
              
                resetForm();
              }}
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                borderRadius: "2rem",
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}>
                Verify Email
              </Button>
            )} */}

{/* 
{isResetPasswordSecurity && (
              <Button
              onClick={() => {
                setPageType("resetPasswordSecurity");
              
                resetForm();
              }}
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                borderRadius: "2rem",
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}>
                Reset Password
              </Button>
            )} */}



            <Typography
              onClick={() => {
                if (isLogin) {
                  setPageType("register");
                } else if (isRegister) {
                  setPageType("login");
                } else if (isVerifyEmail) {
                  setPageType("login");
                } else if (isResetPasswordSecurity) {
                  setPageType("login");
                }
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
               {isLogin
                ? "Don't have an account? Sign Up here."
                : isVerifyEmail
                ? "Remember your password? Login here."
                : isResetPasswordSecurity
                ? "Remember your password? Login here."
                : "Already have an account? Login here."}
            </Typography>
            {isLogin && (
              <Typography
                onClick={() => {
                  setPageType("verifyEmail");
                  resetForm();
                }}
                sx={{
                  textDecoration: "underline",
                  color: palette.primary.main,
                  "&:hover": {
                    cursor: "pointer",
                    color: palette.primary.light,
                  },
                }}
              >
                Forgot Password?
              </Typography>
            )}

          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
