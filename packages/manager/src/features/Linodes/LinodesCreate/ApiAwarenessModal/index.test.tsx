import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { renderWithTheme } from 'src/utilities/testHelpers';

import ApiAwarenessModal, { Props } from '.';

const defaultProps: Props = {
  isOpen: false,
  onClose: jest.fn(),
  payLoad: {},
  route: '',
};

const renderComponent = (overrideProps?: Partial<Props>) => {
  const props = {
    ...defaultProps,
    ...overrideProps,
  };
  return renderWithTheme(<ApiAwarenessModal {...props} />);
};

describe('ApiAwarenessModal', () => {
  it('Should not render ApiAwarenessModal componet', () => {
    renderComponent();
    expect(screen.queryByText('Create Linode')).not.toBeInTheDocument();
  });
  it('Should render ApiAwarenessModal componet when enabled', () => {
    renderComponent({ isOpen: true });
    screen.getByText('Create Linode');
  });
  it('Should invoke onClose handler upon cliking close button', async () => {
    renderComponent({ isOpen: true });
    userEvent.click(await screen.findByTestId('close-button'));
    await waitFor(() => expect(defaultProps.onClose).toHaveBeenCalledTimes(1));
  });
});
