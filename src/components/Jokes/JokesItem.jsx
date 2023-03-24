import {useState} from "react";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Typography
} from "@mui/material";

const JokesItem = ({ joke, onRefreshJoke, onAddJoke, onDeleteJoke }) => {
    const [isHovered, setIsHovered] = useState(false)
    const { id, type, setup, punchline } = joke
    const handleMouseEnter = () => setIsHovered(true)

    const handleMouseLeave = () => setIsHovered(false)

    const handleRefresh = () => onRefreshJoke(id)

    const handleDelete = () => onDeleteJoke(id)

    const handleAdd = () => onAddJoke(id)

    return (
        <Card
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            variant="outlined"
        >
            <CardContent>
                <Box sx={{ minHeight: 250 }} position="relative">
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        flexDirection="row"
                        alignItems="center"
                        mb={2}
                    >
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            flexDirection="row"
                        >
                            <Typography color="text.primary">
                                Type:
                            </Typography>
                            <Typography ml={1} color="blue">
                                {type}
                            </Typography>
                        </Box>
                        <Typography color="blue" variant="body2" component="span">
                            ID #{id}
                        </Typography>
                    </Box>
                    <Box mb={2}>
                        <Typography fontSize={16} color="text.primary">
                            Setup:
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {setup}
                        </Typography>
                    </Box>
                    <Box mb={2}>
                        <Typography fontSize={16} color="text.primary">
                            Punchline:
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {punchline}
                        </Typography>
                    </Box>
                    {
                        isHovered ?
                        <Box position="absolute" bottom="0">
                            <CardActions>
                                <Button onClick={handleDelete} size="small">Delete</Button>
                                <Button onClick={handleAdd} size="small">Add</Button>
                                <Button onClick={handleRefresh} size="small">Refresh</Button>
                            </CardActions>
                        </Box> : null
                    }
                </Box>
            </CardContent>
        </Card>
    )
};

export default JokesItem;