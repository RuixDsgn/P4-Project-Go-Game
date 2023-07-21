"""message

Revision ID: dda3e098f4f0
Revises: a2e8f45788cb
Create Date: 2023-07-20 18:03:01.168776

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dda3e098f4f0'
down_revision = 'a2e8f45788cb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.drop_column('rating')
        batch_op.drop_column('title')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('reviews', schema=None) as batch_op:
        batch_op.add_column(sa.Column('title', sa.VARCHAR(), nullable=False))
        batch_op.add_column(sa.Column('rating', sa.INTEGER(), nullable=True))

    # ### end Alembic commands ###