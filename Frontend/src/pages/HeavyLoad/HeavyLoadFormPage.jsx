/* eslint-disable no-undef */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { Button, Input, Label } from '../../components/UI';
import { useForm } from 'react-hook-form';
import { createNewVolquetaForm } from '../../../api/volquetas';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loading } from '../../components/Loading/Loading';
import swal2 from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';
import { generateFormControlNumber } from '../../libs/generateNumber';
