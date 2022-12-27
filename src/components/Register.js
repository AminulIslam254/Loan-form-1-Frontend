import { Button, makeStyles, TextField } from '@material-ui/core'
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    box1: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    box2: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 10
    },
    box3: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "column",
        minHeight: 530,
        height: "fit-content",
        minWidth: 500,
        width: 200,
        justifyContent: "center",
        border: "2px solid black",
        margin: "0 auto 0 auto",

    },
    cnt: {
        display: "flex",
        justifyContent: "flex-end",
    }
}));

function Register() {

    const classes = useStyles();

    const initialState = { first_name: "", last_name: "", phone_no: "", age: "", applicants_business_name: "", GST_no: "", address: "", business_id: "", loan_amount: "", interest_rate: "", loan_tenure: "" };
    const [formValue, setformValue] = useState(initialState);

    const [formErrors, setFormErrors] = useState({ first_name: "", last_name: "", phone_no: "", age: "", applicants_business_name: "", GST_no: "", address: "", business_id: "", loan_amount: "", interest_rate: "", loan_tenure: "" });

    let [tabno, seTtabno] = useState(0);

    let [flag, setFlag] = useState(1)

    const handleChange = (event) => {

        const { name, value } = event.target;
        setformValue({ ...formValue, [name]: value });
    };
    const validate = (values) => {
        const errors = {};
        if (!values.first_name) {
            errors.first_name = "First Name is required!";
        }
        if (!values.last_name) {
            errors.last_name = "Last Name is required!";
        }
        if (!values.phone_no) {
            errors.phone_no = "Phone No is required!";
        }
        else if (values.phone_no.length !== 10) {
            errors.phone_no = "Phone no must be of 10 numbers";
        } else {
            let flag = false;
            for (let i = 0; i < values.phone_no.length; i++) {
                let text = values.phone_no[i];
                let code = text.charCodeAt(0);
                if (code > 57 || code < 48) {
                    flag = true;
                    break;
                }
            }
            if (flag)
                errors.phone_no = "Phone no must contain Only Numbers";
        }
        if (!values.age) {
            errors.age = "Age is required";
        } else if (values.age.length > 2) {
            errors.age = "Age must be less than 100";
        } else {
            let flag = false;
            for (let i = 0; i < values.age.length; i++) {
                let text = values.age[i];
                let code = text.charCodeAt(0);
                if (code > 57 || code < 48) {
                    flag = true;
                    break;
                }
            }
            if (flag)
                errors.age = "Age must contain Only Numbers";
        }
        if (!values.applicants_business_name) {
            errors.applicants_business_name = "Applicants Business Name is required";
        }
        if (!values.GST_no) {
            errors.GST_no = "GST No is required";
        }
        if (!values.address) {
            errors.address = "Address is required";
        }
        if (!values.business_id) {
            errors.business_id = "Business ID is required";
        }
        if (!values.loan_amount) {
            errors.loan_amount = "Loan Amount is required";
        }
        if (!values.interest_rate) {
            errors.interest_rate = "Interest Rate is required";
        } else if (values.interest_rate.length > 2) {
            errors.interest_rate = "Interest Rate must be less than 100";
        } else {
            let flag = false;
            for (let i = 0; i < values.interest_rate.length; i++) {
                let text = values.interest_rate[i];
                let code = text.charCodeAt(0);
                if (code > 57 || code < 48) {
                    flag = true;
                    break;
                }
            }
            if (flag)
                errors.interest_rate = "Interest Rate must contain Only Numbers";
        }
        if (!values.loan_tenure) {
            errors.loan_tenure = "Loan Tenure is required";
        }

        return (errors);
    }

    const handleSubmit = (event) => {

    }

    const handleTab = (event) => {
        event.preventDefault();

        setFormErrors(validate(formValue));



    }



    const handleData = () => {
        axios.post("https://loanformback1.onrender.com/register", formValue)
            .then(res => {
                if (res.data.message === "User already registerd") {
                    setFormErrors({ email: "Email Already exists try a different one" });
                }
                else {
                    setFormErrors({ email: "" });
                }
            })
        console.log("gone")


    }

    useEffect(() => {

        flag = 0;
        let i = 0;
        if (tabno === 1) {
            i = 4;
        }
        if (tabno === 2) {
            i = 8;
        }
        let cnt = 0;
        Object.entries(initialState).forEach(([key, value]) => {
            if (cnt >= i && cnt < i + 4 && (formErrors[key] !== undefined)) {
                // console.log("hit ",key," ",formErrors[key] ,cnt)
                flag = 1;
            }

            // console.log(key," ",formErrors[key] ,cnt)
            cnt++;
            // console.log(`${key} ${value}`);
        });
        if (flag === 0) {
            console.log("lol")
            seTtabno((tabno + 1) % 3);
            Object.entries(initialState).forEach(([key, value]) => {
                formErrors[key] = "";
            });
        }
    }, [formErrors])

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{width:"80px",height:"30px",backgroundColor:(tabno===0)?"white":"grey",borderRadius:"5px",margin:"10px" ,border:"5px solid black"}}>tab1</div>
                <div style={{width:"80px",height:"30px",backgroundColor:(tabno===1)?"white":"grey",borderRadius:"5px",margin:"10px" ,border:"5px solid black"}}>tab2</div>
                <div style={{width:"80px",height:"30px",backgroundColor:(tabno===2)?"white":"grey",borderRadius:"5px",margin:"10px" ,border:"5px solid black"}}>tab3</div>
            </div>

            <div className={classes.box3}>

                <div className={classes.box1} style={{ display: (tabno === 0) ? "block" : "none" }}>
                    <form className={classes.root} noValidate autoComplete="off">
                        <span style={{ color: "red", margin: 0, padding: 0, display: 'flex', justifyContent: "center" }}>{formErrors.first_name}</span><div style={{ margin: 0, padding: 0, display: "flex", justifyContent: "center" }}><TextField id="outlined-basic" label="Enter First Name" variant="outlined" onChange={handleChange} name="first_name" /></div>
                        <span style={{ color: "red", margin: 0, padding: 0, display: 'flex', justifyContent: "center" }}>{formErrors.last_name}</span><div style={{ margin: 0, padding: 0, display: "flex", justifyContent: "center" }}><TextField id="outlined-basic" label="Enter Last Name" variant="outlined" name="last_name" onChange={handleChange} /></div>
                        <span style={{ color: "red", margin: 0, padding: 0, display: 'flex', justifyContent: "center" }}>{formErrors.phone_no}</span><div style={{ margin: 0, padding: 0, display: "flex", justifyContent: "center" }}><TextField id="outlined-basic" label="Enter Phone Number" variant="outlined" name="phone_no" onChange={handleChange} /></div>
                        <span style={{ color: "red", margin: 0, padding: 0, display: 'flex', justifyContent: "center" }}>{formErrors.age}</span><div style={{ display: "flex", justifyContent: "center" }}><TextField id="outlined-basic" label="Enter Age" variant="outlined" name="age" onChange={handleChange} /></div>

                    </form>

                </div>
                <div className={classes.box1} style={{ display: (tabno === 1) ? "block" : "none" }}>
                    <form className={classes.root} noValidate autoComplete="off">
                        <span style={{ color: "red", margin: 0, padding: 0, display: 'flex', justifyContent: "center" }}>{formErrors.applicants_business_name}</span><div style={{ margin: 0, padding: 0, display: "flex", justifyContent: "center" }}><TextField id="outlined-basic" label="Applicant’s Business Name" variant="outlined" onChange={handleChange} name="applicants_business_name" /></div>
                        <span style={{ color: "red", margin: 0, padding: 0, display: 'flex', justifyContent: "center" }}>{formErrors.GST_no}</span><div style={{ margin: 0, padding: 0, display: "flex", justifyContent: "center" }}><TextField id="outlined-basic" label="Enter GST no" variant="outlined" name="GST_no" onChange={handleChange} /></div>
                        <span style={{ color: "red", margin: 0, padding: 0, display: 'flex', justifyContent: "center" }}>{formErrors.address}</span><div style={{ margin: 0, padding: 0, display: "flex", justifyContent: "center" }}><TextField id="outlined-basic" label="Enter Address" variant="outlined" name="address" onChange={handleChange} /></div>
                        <span style={{ color: "red", margin: 0, padding: 0, display: 'flex', justifyContent: "center" }}>{formErrors.business_id}</span><div style={{ display: "flex", justifyContent: "center" }}><TextField id="outlined-basic" label="Enter Any Business ID" variant="outlined" name="business_id" onChange={handleChange} /></div>

                    </form>

                </div>
                <div className={classes.box1} style={{ display: (tabno === 2) ? "block" : "none" }}>
                    <form className={classes.root} noValidate autoComplete="off">
                        <span style={{ color: "red", margin: 0, padding: 0, display: 'flex', justifyContent: "center" }}>{formErrors.loan_amount}</span><div style={{ margin: 0, padding: 0, display: "flex", justifyContent: "center" }}><TextField id="outlined-basic" label="Enter Loan Amount" variant="outlined" onChange={handleChange} name="loan_amount" /></div>
                        <span style={{ color: "red", margin: 0, padding: 0, display: 'flex', justifyContent: "center" }}>{formErrors.interest_rate}</span><div style={{ margin: 0, padding: 0, display: "flex", justifyContent: "center" }}><TextField id="outlined-basic" label="Enter Interest Rate" variant="outlined" name="interest_rate" onChange={handleChange} /></div>
                        <span style={{ color: "red", margin: 0, padding: 0, display: 'flex', justifyContent: "center" }}>{formErrors.loan_tenure}</span><div style={{ margin: 0, padding: 0, display: "flex", justifyContent: "center" }}><TextField id="outlined-basic" label="Enter Loan Tenure" variant="outlined" name="loan_tenure" onChange={handleChange} /></div>

                    </form>

                </div>


                <div className={classes.box2}>
                    <Button variant="contained" color="primary" onClick={(tabno !== 2) ? handleTab : handleData}>
                        {(tabno !== 2) ? "Next" : "Submit"}
                    </Button>
                </div>
            </div>

        </>
    )
}


export default Register