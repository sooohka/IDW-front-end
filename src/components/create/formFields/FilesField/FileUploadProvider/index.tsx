import React, { createContext, useCallback, useContext, useReducer } from "react";

// actions
const DELETE_FILE = "file/deleteFile" as const;
const APPEND_FILES = "file/appendFiles" as const;
const UPDATE_FILE = "file/updateFile" as const;
const SET_ACCEPTING = "file/setIsAccepting" as const;

// action creators
const appendFiles = (files: TargetFile[]) => ({ type: APPEND_FILES, payload: { files } });
const updateFiles = (file: TargetFile) => ({ type: UPDATE_FILE, payload: { file } });
const deleteFile = (id: string) => ({ type: DELETE_FILE, payload: { id } });
const setIsAccepting = (isAccepting: boolean) => ({
  type: SET_ACCEPTING,
  payload: { isAccepting },
});

type Action =
  | ReturnType<typeof appendFiles>
  | ReturnType<typeof updateFiles>
  | ReturnType<typeof deleteFile>
  | ReturnType<typeof setIsAccepting>;

const initState: { files: TargetFile[]; isAccepting: boolean } = { files: [], isAccepting: false };
const reducer = (state = initState, action: Action): typeof initState => {
  switch (action.type) {
    case APPEND_FILES: {
      const { files } = action.payload;
      return { ...state, files: [...state.files, ...files] };
    }
    case UPDATE_FILE: {
      const { file } = action.payload;
      return { ...state, files: state.files.map((v) => (v.id === file.id ? file : v)) };
    }
    case DELETE_FILE: {
      const { id } = action.payload;
      return { ...state, files: state.files.filter((file) => file.id !== id) };
    }
    case SET_ACCEPTING: {
      const { isAccepting } = action.payload;
      return { ...state, isAccepting };
    }
    default:
      return state;
  }
};

interface FileUploadContextType {
  isAccepting: boolean;
  files: TargetFile[];
  handleFilesAppend: (files: TargetFile[]) => void;
  handleFileDelete: (id: string) => void;
  handleFileUpdate: (fils: TargetFile) => void;
  handleSetIsAccepting: (isAccepting: boolean) => void;
}

const FileUploadContext = createContext<FileUploadContextType>({
  isAccepting: false,
  files: [],
  handleFileDelete: () => {},
  handleFileUpdate: () => {},
  handleFilesAppend: () => {},
  handleSetIsAccepting: () => {},
});

const FileUploadProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const handleFilesAppend = useCallback((files: TargetFile[]) => {
    dispatch(appendFiles(files));
  }, []);
  const handleFileDelete = useCallback((id: string) => {
    dispatch(deleteFile(id));
  }, []);
  const handleSetIsAccepting = useCallback((isAccepting: boolean) => {
    dispatch(setIsAccepting(isAccepting));
  }, []);
  const handleFileUpdate = useCallback((file: TargetFile) => {
    dispatch(updateFiles(file));
  }, []);

  const value = {
    files: state.files,
    isAccepting: state.isAccepting,
    handleFileDelete,
    handleFilesAppend,
    handleSetIsAccepting,
    handleFileUpdate,
  };
  return <FileUploadContext.Provider value={value}>{children}</FileUploadContext.Provider>;
};

const useFileUploadContext = () => useContext(FileUploadContext);

export { useFileUploadContext };
export default FileUploadProvider;
