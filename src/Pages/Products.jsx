import { useCSVReader } from 'react-papaparse';
import { useContext, useState } from 'react';
import { XCircleIcon } from "@heroicons/react/24/solid";
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { ApiContext } from '../Context/DataContext';
import { useNavigate } from 'react-router-dom';

const styles = {
    csvReader: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 10,
    },
    browseFile: {
      width: '20%',
    },
    acceptedFile: {
      border: '1px solid #ccc',
      height: 45,
      lineHeight: 2.5,
      paddingLeft: 10,
      width: '80%',
    },
    remove: {
      borderRadius: 0,
      padding: '0 20px',
    },
    progressBarBackgroundColor: {
      backgroundColor: '#818cf8',
    },
  };

  const people = [
    {
      id: 1,
      name: 'BarChart',
      xaxis:1,
      yaxis:2
    },
    {
        id: 2,
        name: 'AreaChart',
        xaxis:1,
        yaxis:2
      },
      {
        id: 3,
        name: 'LineChart',
        xaxis:1,
        yaxis:2
      },
      {id:4,
        name:'Composed Chart With Axis',
        xaxis:1
      }
  ]

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  

const Products = () => {

    const {setGlobalData, setTypo} = useContext(ApiContext)
    const [data, setData] = useState([]);
    //const [file, setFile] = useState(null);

    const [selected, setSelected] = useState(people[0])

    //for data conversion i.e x-axis mapping
    const [dataHeader, setDataHeader] = useState()
    const [headerSelected, setHeaderSelected] = useState(dataHeader?.at(0))

    //for y-axis mapping
    const [yaxisSelected, setYaxisSelected] = useState(dataHeader?.at(0))


    const [yaxis2Selected, setYaxis2Selected] = useState(dataHeader?.at(0))
    
    const { CSVReader } = useCSVReader();

    const ArrOfObjects =(datai)=>{
        const headers = datai[0];
        setDataHeader(headers);
        setHeaderSelected(headers[0]);
        setYaxisSelected(headers[0]);
    
    // Remove headers from the array
      const dataremoved = datai.slice(1);
    
    // Convert array of arrays to array of objects
      const arrayOfObjects = dataremoved.map(row => {
        const obj = {};
        headers.forEach((header, index) => {

          obj[header] = row[index];
        });
        return obj;
      });
      console.log("converted to array of objects: ",arrayOfObjects, headers);
      const filtered = arrayOfObjects.filter(item => item?.id != "" ? item : null);
      setData(filtered);
      }
    
    
    const navigate = useNavigate()

    console.log('y-axis', yaxisSelected, data);

    const ModelData =()=>{
        const refinedmodels = data?.map((item, index)=>{
            return {id:index, name:item[headerSelected], uv:item[yaxisSelected], pv:item[yaxis2Selected], amt:(Number(item[yaxisSelected]) + Number(item[yaxis2Selected]))}
        })
        setGlobalData(refinedmodels);
        setTypo(selected.name)
        navigate('/products/graph')
        console.log("refined models: ",refinedmodels, selected);
    }


  return (
    <div className="max-w-7xl mx-auto p-10">
        <h1 className=" text-3xl text-center font-bold mb-10">Convert <span className="text-indigo-400">CSV files</span> to visual graphs</h1>
      <div className="grid grid-cols-4 gap-1">
        <div className="col-span-4 sm:col-span-2">
 
                <div>
                <CSVReader
                onUploadAccepted={(results) => {
                    console.log('---------------------------');
                    ArrOfObjects(results.data)
                    console.log('---------------------------');
                }}>
                {({
                    getRootProps,
                    acceptedFile,
                    ProgressBar,
                    getRemoveFileProps,
                }) => (
                    <div className="w-full py-9 bg-gray-50 rounded-2xl border border-gray-300 gap-3 grid border-dashed">
                        <div className="grid gap-1">
                            <svg className="mx-auto" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="File">
                                <path id="icon" d="M31.6497 10.6056L32.2476 10.0741L31.6497 10.6056ZM28.6559 7.23757L28.058 7.76907L28.058 7.76907L28.6559 7.23757ZM26.5356 5.29253L26.2079 6.02233L26.2079 6.02233L26.5356 5.29253ZM33.1161 12.5827L32.3683 12.867V12.867L33.1161 12.5827ZM31.8692 33.5355L32.4349 34.1012L31.8692 33.5355ZM24.231 11.4836L25.0157 11.3276L24.231 11.4836ZM26.85 14.1026L26.694 14.8872L26.85 14.1026ZM11.667 20.8667C11.2252 20.8667 10.867 21.2248 10.867 21.6667C10.867 22.1085 11.2252 22.4667 11.667 22.4667V20.8667ZM25.0003 22.4667C25.4422 22.4667 25.8003 22.1085 25.8003 21.6667C25.8003 21.2248 25.4422 20.8667 25.0003 20.8667V22.4667ZM11.667 25.8667C11.2252 25.8667 10.867 26.2248 10.867 26.6667C10.867 27.1085 11.2252 27.4667 11.667 27.4667V25.8667ZM20.0003 27.4667C20.4422 27.4667 20.8003 27.1085 20.8003 26.6667C20.8003 26.2248 20.4422 25.8667 20.0003 25.8667V27.4667ZM23.3337 34.2H16.667V35.8H23.3337V34.2ZM7.46699 25V15H5.86699V25H7.46699ZM32.5337 15.0347V25H34.1337V15.0347H32.5337ZM16.667 5.8H23.6732V4.2H16.667V5.8ZM23.6732 5.8C25.2185 5.8 25.7493 5.81639 26.2079 6.02233L26.8633 4.56274C26.0191 4.18361 25.0759 4.2 23.6732 4.2V5.8ZM29.2539 6.70608C28.322 5.65771 27.7076 4.94187 26.8633 4.56274L26.2079 6.02233C26.6665 6.22826 27.0314 6.6141 28.058 7.76907L29.2539 6.70608ZM34.1337 15.0347C34.1337 13.8411 34.1458 13.0399 33.8638 12.2984L32.3683 12.867C32.5216 13.2702 32.5337 13.7221 32.5337 15.0347H34.1337ZM31.0518 11.1371C31.9238 12.1181 32.215 12.4639 32.3683 12.867L33.8638 12.2984C33.5819 11.5569 33.0406 10.9662 32.2476 10.0741L31.0518 11.1371ZM16.667 34.2C14.2874 34.2 12.5831 34.1983 11.2872 34.0241C10.0144 33.8529 9.25596 33.5287 8.69714 32.9698L7.56577 34.1012C8.47142 35.0069 9.62375 35.4148 11.074 35.6098C12.5013 35.8017 14.3326 35.8 16.667 35.8V34.2ZM5.86699 25C5.86699 27.3344 5.86529 29.1657 6.05718 30.593C6.25217 32.0432 6.66012 33.1956 7.56577 34.1012L8.69714 32.9698C8.13833 32.411 7.81405 31.6526 7.64292 30.3798C7.46869 29.0839 7.46699 27.3796 7.46699 25H5.86699ZM23.3337 35.8C25.6681 35.8 27.4993 35.8017 28.9266 35.6098C30.3769 35.4148 31.5292 35.0069 32.4349 34.1012L31.3035 32.9698C30.7447 33.5287 29.9863 33.8529 28.7134 34.0241C27.4175 34.1983 25.7133 34.2 23.3337 34.2V35.8ZM32.5337 25C32.5337 27.3796 32.532 29.0839 32.3577 30.3798C32.1866 31.6526 31.8623 32.411 31.3035 32.9698L32.4349 34.1012C33.3405 33.1956 33.7485 32.0432 33.9435 30.593C34.1354 29.1657 34.1337 27.3344 34.1337 25H32.5337ZM7.46699 15C7.46699 12.6204 7.46869 10.9161 7.64292 9.62024C7.81405 8.34738 8.13833 7.58897 8.69714 7.03015L7.56577 5.89878C6.66012 6.80443 6.25217 7.95676 6.05718 9.40704C5.86529 10.8343 5.86699 12.6656 5.86699 15H7.46699ZM16.667 4.2C14.3326 4.2 12.5013 4.1983 11.074 4.39019C9.62375 4.58518 8.47142 4.99313 7.56577 5.89878L8.69714 7.03015C9.25596 6.47133 10.0144 6.14706 11.2872 5.97592C12.5831 5.8017 14.2874 5.8 16.667 5.8V4.2ZM23.367 5V10H24.967V5H23.367ZM28.3337 14.9667H33.3337V13.3667H28.3337V14.9667ZM23.367 10C23.367 10.7361 23.3631 11.221 23.4464 11.6397L25.0157 11.3276C24.9709 11.1023 24.967 10.8128 24.967 10H23.367ZM28.3337 13.3667C27.5209 13.3667 27.2313 13.3628 27.0061 13.318L26.694 14.8872C27.1127 14.9705 27.5976 14.9667 28.3337 14.9667V13.3667ZM23.4464 11.6397C23.7726 13.2794 25.0543 14.5611 26.694 14.8872L27.0061 13.318C26.0011 13.1181 25.2156 12.3325 25.0157 11.3276L23.4464 11.6397ZM11.667 22.4667H25.0003V20.8667H11.667V22.4667ZM11.667 27.4667H20.0003V25.8667H11.667V27.4667ZM32.2476 10.0741L29.2539 6.70608L28.058 7.76907L31.0518 11.1371L32.2476 10.0741Z" fill="#4F46E5" />
                            </g>
                            </svg>
                            <h2 className="text-center text-gray-400   text-xs leading-4">PDF, smaller than 2MB</h2>
                        </div>
                        <div className="grid gap-2">
                            <h4 className="text-center text-gray-900 text-sm font-medium leading-snug">Drag and Drop your file here or</h4>

                            <div className=" flex justify-center italic text-indigo-500 my-1 text-lg font-semibold text-center">{acceptedFile && acceptedFile.name}
                           { acceptedFile && <button {...getRemoveFileProps()} style={styles.remove}><XCircleIcon className="w-5 h-5 fill-red-500"/></button>}
                            </div>
                            <div className="flex items-center justify-center">
                                <label>
                                    {/* <input type="file" hidden /> */}
                                    <div {...getRootProps()} className="flex w-28 h-9 px-2 flex-col bg-indigo-600 rounded-full shadow text-white text-xs font-semibold leading-4 items-center justify-center cursor-pointer focus:outline-none">Choose File</div>
                                </label>
                            </div>
                        </div>
                        <div>
                        <ProgressBar style={styles.progressBarBackgroundColor} /> 
                        </div>
                    </div>
                )}
                </CSVReader>
                </div>

        </div>
        <div className="sm:col-span-2 col-span-4 p-2">
       
            <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
                <>
                <Label className="block text-sm font-medium leading-6 text-gray-900">Select Type of Graph</Label>
                <div className="relative mt-2">
                    <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                    <span className="flex items-center">
                        <span className="ml-3 block truncate">{selected.name}</span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                    </ListboxButton>

                    <Transition show={open} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {people.map((person) => (
                        <ListboxOption
                            key={person.id}
                            className={({ focus }) =>
                            classNames(
                                focus ? 'bg-indigo-600 text-white' : '',
                                !focus ? 'text-gray-900' : '',
                                'relative cursor-default select-none py-2 pl-3 pr-9'
                            )
                            }
                            value={person}
                        >
                            {({ selected, focus }) => (
                            <>
                                <div className="flex items-center">
                                <span
                                    className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                >
                                    {person.name}
                                </span>
                                </div>

                                {selected ? (
                                <span
                                    className={classNames(
                                    focus ? 'text-white' : 'text-indigo-600',
                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                    )}
                                >
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                                ) : null}
                            </>
                            )}
                        </ListboxOption>
                        ))}
                    </ListboxOptions>
                    </Transition>
                </div>
                </>
            )}
            </Listbox>

            <div className='p-3 rounded-md border my-2 border-indigo-800'>
                <div className=' items-center'>
                    <h6 className=' font-bold text-gray-500'>X-Axis :</h6>

                    <Listbox value={headerSelected} onChange={setHeaderSelected}>
            {({ open }) => (
                <>
                <div className="relative mt-2">
                    <ListboxButton className="relative cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                    <span className="flex items-center">
                        <span className="ml-3 block truncate">{headerSelected}</span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                    </ListboxButton>

                    <Transition show={open} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {dataHeader?.map((person, index) => (
                        <ListboxOption
                            key={index}
                            className={({ focus }) =>
                            classNames(
                                focus ? 'bg-indigo-600 text-white' : '',
                                !focus ? 'text-gray-900' : '',
                                'relative cursor-default select-none py-2 pl-3 pr-9'
                            )
                            }
                            value={person}
                        >
                            {({ selected, focus }) => (
                            <>
                                <div className="flex items-center">
                                <span
                                    className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                >
                                    {person}
                                </span>
                                </div>

                                {selected ? (
                                <span
                                    className={classNames(
                                    focus ? 'text-white' : 'text-indigo-600',
                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                    )}
                                >
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                                ) : null}
                            </>
                            )}
                        </ListboxOption>
                        ))}
                    </ListboxOptions>
                    </Transition>
                </div>
                </>
            )}
            </Listbox>

                </div>

                <div className=' items-center'>
                    <h6 className=' font-bold text-gray-500'>Y-Axis :</h6>

                    <Listbox value={yaxisSelected} onChange={setYaxisSelected}>
            {({ open }) => (
                <>
                <div className="relative mt-2">
                    <ListboxButton className="relative cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                    <span className="flex items-center">
                        <span className="ml-3 block truncate">{yaxisSelected}</span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                    </ListboxButton>

                    <Transition show={open} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {dataHeader?.map((person, index) => (
                        <ListboxOption
                            key={index}
                            className={({ focus }) =>
                            classNames(
                                focus ? 'bg-indigo-600 text-white' : '',
                                !focus ? 'text-gray-900' : '',
                                'relative cursor-default select-none py-2 pl-3 pr-9'
                            )
                            }
                            value={person}
                        >
                            {({ selected, focus }) => (
                            <>
                                <div className="flex items-center">
                                <span
                                    className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                >
                                    {person}
                                </span>
                                </div>

                                {selected ? (
                                <span
                                    className={classNames(
                                    focus ? 'text-white' : 'text-indigo-600',
                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                    )}
                                >
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                                ) : null}
                            </>
                            )}
                        </ListboxOption>
                        ))}
                    </ListboxOptions>
                    </Transition>
                </div>
                </>
            )}
            </Listbox>

                </div>

                <div className=' items-center'>
                    <h6 className=' font-bold text-gray-500'>Y-Axis 2 <span className=' text-sm italic text-indigo-500'>(Optional)</span> :</h6>

                    <Listbox value={yaxis2Selected} onChange={setYaxis2Selected}>
            {({ open }) => (
                <>
                <div className="relative mt-2">
                    <ListboxButton className="relative cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                    <span className="flex items-center">
                        <span className="ml-3 block truncate">{yaxis2Selected}</span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                    </ListboxButton>

                    <Transition show={open} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {dataHeader?.map((person, index) => (
                        <ListboxOption
                            key={index}
                            className={({ focus }) =>
                            classNames(
                                focus ? 'bg-indigo-600 text-white' : '',
                                !focus ? 'text-gray-900' : '',
                                'relative cursor-default select-none py-2 pl-3 pr-9'
                            )
                            }
                            value={person}
                        >
                            {({ selected, focus }) => (
                            <>
                                <div className="flex items-center">
                                <span
                                    className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                >
                                    {person}
                                </span>
                                </div>

                                {selected ? (
                                <span
                                    className={classNames(
                                    focus ? 'text-white' : 'text-indigo-600',
                                    'absolute inset-y-0 right-0 flex items-center pr-4'
                                    )}
                                >
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                                ) : null}
                            </>
                            )}
                        </ListboxOption>
                        ))}
                    </ListboxOptions>
                    </Transition>
                </div>
                </>
            )}
            </Listbox>

                </div>
            </div>

            <div className=''>
                <button onClick={ModelData} className=' py-2 px-8 rounded-md bg-indigo-600 text-white'>Start</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Products



 {/* <>
                    <div style={styles.csvReader}>
                        <button type='button' {...getRootProps()} style={styles.browseFile}>
                        Browse file
                        </button>
                        <div style={styles.acceptedFile}>
                        {acceptedFile && acceptedFile.name}
                        </div>
                        <button {...getRemoveFileProps()} style={styles.remove}>
                        Remove
                        </button>
                    </div>
                    <ProgressBar style={styles.progressBarBackgroundColor} />
                    </> */}