import { useState, useMemo } from 'react';
import { createTheme, ThemeProvider, alpha, getContrastRatio } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import { CardGrid } from '../CardGrid/CardGrid';


const mintBase = '#72C49E';

const theme = createTheme({
    palette: {
        mint: {
            main: mintBase,
            light: alpha(mintBase, 0.5),
            dark: alpha(mintBase, 0.9),
            contrastText: getContrastRatio(alpha(mintBase, 0.7), '#fff') > 4.5 ? '#fff' : '#111',
        }
    },
});


export const CardPagination = ({
    results,
    recipeList,
    handleLikeButton,
    handleRemoveButton,
    listSection
}) => {

    const itemsPerPage = 8;

    const [page, setPage] = useState(1);
    const numOfPages = useMemo(() => Math.ceil(results?.length / itemsPerPage));

    return (
        <>
            <CardGrid
                results={results}
                title="title"
                image="image"
                cookTime="readyInMinutes"
                handleLikeButton={handleLikeButton}
                handleRemoveButton={handleRemoveButton}
                recipeList={recipeList}
                listSection={listSection}
                itemsPerPage={itemsPerPage}
                page={page}
            />
            <ThemeProvider theme={theme}>
                {numOfPages === 1 ? null :
                    <Pagination
                        count={numOfPages}
                        variant="outlined"
                        color="mint"
                        page={page}
                        onChange={(event, value) => setPage(value)}
                    />
                }
            </ThemeProvider>
        </>
    );
};
