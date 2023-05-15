import { render, screen } from '@testing-library/react';
import { Posts } from '.';

const props = {
  posts: [
    {
      id: 1,
      title: 'title01',
      body: 'body01',
      cover: 'img/img01.png',
    },
    {
      id: 2,
      title: 'title02',
      body: 'body02',
      cover: 'img/img02.png',
    },
    {
      id: 3,
      title: 'title03',
      body: 'body03',
      cover: 'img/img03.png',
    },
  ],
};

describe('<Posts/>', () => {
  it('should render posts', () => {
    render(<Posts {...props} />);

    const allTitles = screen.getAllByRole('heading', { name: /title/i });
    expect(allTitles).toHaveLength(3);

    const allImages = screen.getAllByRole('img', { name: /title/i });
    expect(allImages).toHaveLength(3);

    const allBody = screen.getAllByText(/body/i);
    expect(allBody).toHaveLength(3);

    const oneImage = screen.getByRole('img', { name: /title02/i });
    expect(oneImage).toHaveAttribute('src', 'img/img02.png');
  });

  it('should not render posts', () => {
    render(<Posts />);

    const postEmpty = screen.queryByRole('heading', { name: /title/i });
    expect(postEmpty).not.toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const { container } = render(<Posts {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
