import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { useState, useRef } from 'react';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (param: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectArticleState, setSelectArticleState] = useState(articleState);

	const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setArticleState(selectArticleState);
	};

	const resetHandler = () => {
		setArticleState(defaultArticleState);
	};

	const changeHandler = (key: keyof ArticleStateType, value: OptionType) => {
		setSelectArticleState({ ...selectArticleState, [key]: value });
	};

	const ref = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen: isOpen,
		rootRef: ref,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
	});

	return (
		<div ref={ref}>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => setIsOpen((prevState) => !prevState)}
			/>
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={submitHandler}
					onReset={resetHandler}>
					<Select
						options={fontFamilyOptions}
						selected={selectArticleState.fontFamilyOption}
						onChange={(selectElement: OptionType) =>
							changeHandler('fontFamilyOption', selectElement)
						}
						title='Шрифт'
					/>

					<RadioGroup
						name=''
						options={fontSizeOptions}
						selected={selectArticleState.fontSizeOption}
						onChange={(selectElement: OptionType) =>
							changeHandler('fontSizeOption', selectElement)
						}
						title='Размер шрифта'
					/>

					<Select
						options={fontColors}
						selected={selectArticleState.fontColor}
						onChange={(selectElement: OptionType) =>
							changeHandler('fontColor', selectElement)
						}
						title='Шрифт'
					/>

					<Separator />

					<Select
						options={backgroundColors}
						selected={selectArticleState.backgroundColor}
						onChange={(selectElement: OptionType) =>
							changeHandler('backgroundColor', selectElement)
						}
						title='Цвет фона'
					/>

					<Select
						options={contentWidthArr}
						selected={selectArticleState.contentWidth}
						onChange={(selectElement: OptionType) =>
							changeHandler('contentWidth', selectElement)
						}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
