import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    appBar: {
        borderRadius: 15,
        margin: '20px 0',
        display: 'flex',
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        color: 'rgba(0,200,200, 1)',
    },
    image: {
        width: '100%',
        height: 'auto',
    },
    [theme.breakpoints.down('sm')]: {
        mainCon: {
            flexDirection: "column-reverse",
        }
    }

}));