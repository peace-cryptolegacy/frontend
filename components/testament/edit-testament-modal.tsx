import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import CreatePlan from 'components/create-plan';

import type { ITestament } from 'utils/web3/heritage';

type props = {
  testator: ITestament
}

const EditTestamentModal = ({ testator }: props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleClose() {
    setIsOpen(false);
  }

  function handleClick() {
    setIsOpen(true);
  }

  return (
    <Box>
      <EditIcon onClick={ handleClick } />

      <Modal 
        isCentered
        isOpen={ isOpen } 
        onClose={ handleClose } 
        size='lg'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody padding={10}>
            <CreatePlan />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default EditTestamentModal;
