import { render, screen } from '@testing-library/react';
import { PostCard } from '.';
import { postCardPropsMock } from './mock';

const props = postCardPropsMock;

describe('<PostCard/>', () => {
  it('should render PostCard correctly', () => {
    render(<PostCard {...props} />);

    const img = screen.getByAltText(/title01/i);
    expect(img).toHaveAttribute('src', 'img/img.png');

    const heading = screen.getByRole('heading', { name: 'title01 1' });
    expect(heading).toBeInTheDocument();

    const body = screen.getByText('body01');
    expect(body).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(<PostCard {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
