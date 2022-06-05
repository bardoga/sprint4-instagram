import React from "react";
import { Link } from "react-router-dom";
import { userService } from "../services/user.service";
import { signup } from "../store/actions/user.action";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'

const theme = createTheme()

export function SignUp() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        // const fName = data.get('fullname')
        const user = {
            username: data.get('email'),
            fullname: data.get('fullname'),
            password: data.get('password'),
            username: data.get('username')
        }
        try {
            await dispatch(signup(user))
            navigate('/gram')
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <AssignmentIndIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="fullname"
                                    required
                                    fullWidth
                                    id="Fullname"
                                    label="fullname"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="email"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid item sx={{ mt: 3, mb: 2 }}>
                            <Link to="/login" >
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    )
}