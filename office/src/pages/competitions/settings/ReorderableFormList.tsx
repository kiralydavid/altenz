import { ReactNode } from "react";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { ActionIcon, Button, Center, Fieldset, Group } from "@mantine/core";
import { IconGripVertical, IconTrash } from "@tabler/icons-react";
import { useFieldArray } from "react-hook-form";

interface ReorderableFormListProps {
  item: (index: number, key: string) => ReactNode;
  collapseContent?: (index: number) => ReactNode;
  path: string;
  addButtonLabel: string;
  legend: string;
  emptyItemCreator: () => any;
}

export const ReorderableFormList = ({
  item,
  collapseContent,
  path,
  addButtonLabel,
  legend,
  emptyItemCreator,
}: ReorderableFormListProps) => {
  const { fields, append, remove, move } = useFieldArray({
    name: path,
  });

  return (
    <Fieldset legend={legend}>
      <DragDropContext
        onDragEnd={({ destination, source }) =>
          destination?.index !== undefined && move(source.index, destination.index)
        }
      >
        <Droppable droppableId="dnd-list" direction="vertical">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {fields.map(({ id }, index) => (
                <Draggable key={index} index={index} draggableId={index.toString()}>
                  {(innerProvided) => (
                    <div {...innerProvided.draggableProps}>
                      <Group mt="xs" ref={innerProvided.innerRef}>
                        <Center {...innerProvided.dragHandleProps}>
                          <IconGripVertical size="1.2rem" />
                        </Center>

                        {item(index, id)}

                        <ActionIcon variant="default">
                          <IconTrash onClick={() => remove(index)} />
                        </ActionIcon>
                      </Group>

                      {collapseContent?.(index)}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Group mt="md">
        <Button onClick={() => append(emptyItemCreator())}>{addButtonLabel}</Button>
      </Group>
    </Fieldset>
  );
};
