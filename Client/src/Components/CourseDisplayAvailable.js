import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button'
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
// hooks
import { useSelector,useDispatch } from 'react-redux';
import Type from 'Store/TYPE'
// API
import {getCourseAvailableClass} from 'Helpers/API/SampleAPI'
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
 
  const [courseItem,setCourseItem]=React.useState(null)
  const classes = useRowStyles();
    React.useEffect(()=>{
        if(open && courseItem===null && row.id){
            
         const data=getCourseAvailableClass(row.id)
         setCourseItem(data.map(e=>({id:e.class_id,wd:e.week_day,time:e.time_last})))
        }
    },[open,row.id,courseItem])
   
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(o=>!o)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        
        <TableCell align="center">{row?.id}</TableCell>
        <TableCell align="center">{row?.name}</TableCell>
        <TableCell align="center">{row?.count}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto">
            <Box margin={1}>
             
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Mã lớp</TableCell>
                    <TableCell>Thứ</TableCell>
                    <TableCell align="center">Thời gian</TableCell>
                    <TableCell align="center">Trùng</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {courseItem?.map((historyRow,i) => (
                    <TableRow key={historyRow.id+i}>
                      <TableCell component="th" scope="row">
                        {historyRow.id}
                      </TableCell>
                      <TableCell>{historyRow.wd}</TableCell>
                      <TableCell align="right">{historyRow.time}</TableCell>
                      <TableCell align="right">
                       
                      </TableCell>
                      <AddCourseButton time={{wd:historyRow.wd,time:historyRow.time}} classId={historyRow.id} courseId={row.id}/>
                    </TableRow>
                  ))}
                 
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const AddCourseButton=({classId,courseId,time})=>{
  const selected=useSelector(state=>state.selected.courses)
  const [message,setMessage]=useState("Add")
   const [lock,setLock]=useState(true) 
  const dispatch=useDispatch()


  const handleClick=()=>{
    //dispatch({type:Type.insertSelectedCourse,payload:{classId,courseId}})
    
  }
  return <TableCell align="right">
  <Button onClick={handleClick} disabled={lock} color="primary" variant="outlined">{message}</Button>
  </TableCell>
}







export default function CourseDisplayAvailable() {
  const courseList=useSelector(state=>state.cart.courses)  
  
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Mã học phần</TableCell>
            <TableCell align="center">Tên học phần</TableCell>
            <TableCell align="center">Số lượng</TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courseList?.map((row,i) => (
            <Row key={"row-number-"+i} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}