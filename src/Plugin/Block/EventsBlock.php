<?php

namespace Drupal\cwd_events\Plugin\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Block\BlockPluginInterface;
use Drupal\Core\Form\FormStateInterface;


/*
      '#markup' => $this->t('Hello @name!', ['@name' => $name ])
*/

/**
 * Provides an Events Block containing Localist Data.
 *
 * @Block(
 *   id = "cwd_events_block",
 *   admin_label = @Translation("Events block"),
 *   category = @Translation("Events Block"),
 * )
 */
class EventsBlock extends BlockBase  implements BlockPluginInterface {
  //list of supported format options
  private $format_options = array('standard','compact','archive', 'calendar');

  /**
   * {@inheritdoc}
   */
  public function build() {
    return [
      '#attached' => ['library' => ["cwd_events/cwdeventslib"]],
      '#markup' => $this->t("<div class='events-listing' id='events-listing'></div><script>renderEvents('events-listing',@depts,@entries,'@format',@group,@singleday,'@keyword');</script>", 
      	[
      		"@depts" => $this->configuration['cwd_events_depts'],
      		"@entries" =>  $this->configuration['cwd_events_entries'],
      		"@format" =>  $this->configuration['cwd_events_format'],
      		"@group" =>  $this->configuration['cwd_events_group'],
      		"@singleday" =>  $this->configuration['cwd_events_singleday'] ? 'true' : 'false',
      		"@keyword" =>  $this->configuration['cwd_events_keyword']
      	]),
    ];
  }

/*
function renderEvents(target, depts, entries, format, group, singleday, keyword) {
    depts = (typeof depts === 'undefined') ? 0 : depts;
    entries = (typeof entries === 'undefined') ? 3 : entries;
    format = (typeof format === 'undefined') ? 'standard' : format;
    group = (typeof group === 'undefined') ? 0 : group;
    singleday = (typeof singleday === 'undefined') ? false : singleday;
    keyword = (typeof keyword === 'undefined') ? false : keyword;
 */


  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state) {
    $form = parent::blockForm($form, $form_state);
    $config = $this->getConfiguration();
    $format_options = $this->format_options;

    $form['cwd_events_depts'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Departments'),
      '#description' => $this->t('The department to include by ID'),
      '#default_value' => isset($config['cwd_events_depts']) ? $config['cwd_events_depts'] : 0,
    ];

    $form['cwd_events_entries'] = [
      '#type' => 'number',
      '#title' => $this->t('Entries'),
      '#description' => $this->t('Max number of entries to display, up to 100'),
      '#default_value' => isset($config['cwd_events_entries']) ? $config['cwd_events_entries'] : 3,
    ];

    
    $form['cwd_events_format'] = [
      '#type' => 'select',
      '#title' => $this->t('Format'),
      '#description' => $this->t('Choices are: standard (default), compact (omit thumbnail, type and end time), archive (past events in reverse order), calendar (date on left)'),
      '#options' => $format_options,
      '#default_value' => isset($config['cwd_events_format']) ? $config['cwd_events_format'] : 'standard',
    ];

    $form['cwd_events_group'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Group'),
      '#description' => $this->t('Localist filter option'),
      '#default_value' => isset($config['cwd_events_group']) ? $config['cwd_events_group'] : 0,
    ];

    $form['cwd_events_singleday'] = [
      '#type' => 'boolean',
      '#title' => $this->t('Single Day'),
      '#description' => $this->t('Format is YYYY-MM-DD to limit to specific day'),
      '#default_value' => isset($config['cwd_events_singleday']) ? $config['cwd_events_singleday'] : false,
    ];

    $form['cwd_events_keyword'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Keyword'),
      '#description' => $this->t('Display events with a specific tag or keyword (can be used alone or in combination with "depts" and "group")'),
      '#default_value' => isset($config['cwd_events_keyword']) ? $config['cwd_events_keyword'] : false,
    ];

    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, FormStateInterface $form_state) {
    parent::blockSubmit($form, $form_state);
    $values = $form_state->getValues();
    $format_options = $this->format_options;
    $this->configuration['cwd_events_depts'] = $values['cwd_events_depts'];
    $this->configuration['cwd_events_entries'] = $values['cwd_events_entries'];
    $this->configuration['cwd_events_format'] = $format_options[$values['cwd_events_format']];
    $this->configuration['cwd_events_group'] = $values['cwd_events_group'];
    $this->configuration['cwd_events_singleday'] = $values['cwd_events_singleday'];
    $this->configuration['cwd_events_keyword'] = $values['cwd_events_keyword'];
  }


}
