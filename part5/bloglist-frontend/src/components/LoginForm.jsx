import { Box, Button, TextField, Typography } from '@mui/material'

const LoginForm = ({
  handleLogin,
  setUsername,
  username,
  setPassword,
  password,
}) => {
  return (
    <Box>
      <Typography
        component="h2"
        sx={{
          fontFamily: 'serif',
          fontSize: '1.75rem',
          fontWeight: 700,
          color: '#111',
          mb: 3,
        }}
      >
        Log in to application
      </Typography>

      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: 250,
          gap: 2,
        }}
      >
        <TextField
          id="username"
          label="username"
          variant="standard"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />

        <TextField
          id="password"
          label="password"
          type="password"
          variant="standard"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />

        <Box sx={{ mt: 1 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="medium"
          >
            LOGIN
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default LoginForm