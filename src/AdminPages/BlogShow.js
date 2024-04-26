import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import SideBar from '../components/AdminSideBar';
import { Block, Visibility, Delete, Person, Lock } from '@mui/icons-material';
import { styled } from '@mui/system';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';

const GradientBlockButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(to right, #FF6464, #D34C4C)',
  color: '#ffffff',
  '&:hover': {
    background: 'linear-gradient(to right, #FF6464, #D34C4C)',
  },
}));

const GradientDetailsButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(to right, #000000, #3533CD)',
  color: '#ffffff',
  '&:hover': {
    background: 'linear-gradient(to right, #000000, #3533CD)',
  },
}));

const BlogTable = ({ data, isBlocked, handleBlockUnblock }) => {
  const columns = [
    { id: 'user', label: 'User' },
    { id: 'blogTitle', label: 'Blog Title' },
    { id: 'rating', label: 'Rating' },
    { id: 'block', label: 'Block/Unblock' },
    { id: 'details', label: 'Details' },
  ];

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.Username}</TableCell>
              <TableCell>{row.Accounttitle}</TableCell>
              <TableCell>{row.Rating}</TableCell>
              <TableCell>
                <GradientBlockButton
                  variant="contained"
                  size="small"
                  onClick={() => handleBlockUnblock(row, isBlocked)}
                  style={{ borderRadius: 10 }}
                >
                  {isBlocked ? 'Unblock' : 'Block'}
                </GradientBlockButton>
              </TableCell>
              <TableCell>
                <GradientDetailsButton
                  variant="contained"
                  size="small"
                  // onClick={() => handleDetails(row)}
                  startIcon={<Visibility />}
                  style={{ borderRadius: 10 }}
                >
                  Details
                </GradientDetailsButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const BlockedBlogsPage = () => {
  const [unblockedBlogsData, setUnblockedBlogsData] = useState([]);
  const [blockedBlogsData, setBlockedBlogsData] = useState([]);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleBlockUnblock = async (row, block) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Token not found in local storage');
        return;
      }

      const endpoint = block ? 'disableblog' : 'ableblog';
      const response = await fetch(`http://localhost:3000/blog/${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify({
          BlogId: row._id,
          reason: block ? 'Your blog is disabled' : undefined,
        }),
      });

      if (response.ok) {
        const updatedBlogData = await response.json();

        // Check if the updatedBlogData is an array before using filter
        // if (Array.isArray(updatedBlogData)) {
          if (block) {
            let index;
            let temparr = [...blockedBlogsData];
            for (let i = 0; i < blockedBlogsData.length; i++) {
              if (blockedBlogsData[i]._id === row._id) {
                index = i;
              }
            }
            temparr.splice(index, 1);
            setBlockedBlogsData(temparr);
            let newtemp = [...unblockedBlogsData];
            newtemp.push(row);
            setUnblockedBlogsData(newtemp);
          } else {
            let index;
            let temparr = [...unblockedBlogsData];
            for (let i = 0; i < unblockedBlogsData.length; i++) {
              if (unblockedBlogsData[i]._id === row._id) {
                index = i;
              }
            }
            temparr.splice(index, 1);
            setUnblockedBlogsData(temparr);
            let newtemp = [...blockedBlogsData];
            newtemp.push(row);
            setBlockedBlogsData(newtemp);
          }
          console.log(`${block ? 'Block' : 'Unblock'} successful for:`, row);
        // } else {
        //   console.error('Unexpected response format:', updatedBlogData);
        // }
      } else {
        console.error(`${block ? 'Block' : 'Unblock'} blog failed:`, response.statusText);
      }
    } catch (error) {
      console.error(`Unexpected error during ${block ? 'block' : 'unblock'} blog:`, error);
    }
  };
  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const response = await fetch('http://localhost:3000/blog/getallblogs');
  
        if (response.ok) {
          const data = await response.json();
  
          // Assuming the response data is an array of blogs
          // Filter unblocked and blocked blogs
          const unblockedBlogs = data.filter((blog) => !blog.Disabled);
          const blockedBlogs = data.filter((blog) => blog.Disabled);
  
          setUnblockedBlogsData(unblockedBlogs);
          setBlockedBlogsData(blockedBlogs);
        } else {
          console.error('Error fetching blogs:', response.statusText);
          // Handle error, e.g., show error message to the user
        }
      } catch (error) {
        console.error('Unexpected error during fetching blogs:', error);
      }
    };
  
    getAllBlogs();
  }, []);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Conditionally set marginLeft and marginRight based on screen size
  const marginLeft = isMobile ? 10 : 300;
  const marginRight = isMobile ? 10 : 50;
  return (
    <>
      <div>
        <SideBar active="/blogs" />
      </div>
      <div style={{ marginTop: 30, marginLeft, marginRight }}>
        <Box>
          <Tabs value={value} onChange={handleChange} indicatorColor="primary">
            <Tab label="Unblocked Blogs" icon={<Person />} />
            <Tab label="Blocked Blogs" icon={<Lock />} />
          </Tabs>
          <Box>
            {value === 0 && (
              <BlogTable data={unblockedBlogsData} isBlocked={false} handleBlockUnblock={handleBlockUnblock} />
            )}
            {value === 1 && (
              <BlogTable data={blockedBlogsData} isBlocked={true} handleBlockUnblock={handleBlockUnblock} />
            )}
          </Box>
        </Box>
      </div>
    </>
  );
};

export default BlockedBlogsPage;
